import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { BloomEffect, EffectComposer, EffectPass, RenderPass, SMAAEffect, SMAAPreset } from 'postprocessing';

interface HyperspeedProps {
  effectOptions?: any;
}

// Move vectors outside to prevent GC
const LOOK_AT_AMP = new THREE.Vector3(-2, -5, 0);
const LOOK_AT_OFFSET = new THREE.Vector3(0, 0, -10);

const Hyperspeed: React.FC<HyperspeedProps> = ({ effectOptions }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const appInstance = useRef<any>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const options = {
      length: 400,
      roadWidth: 10,
      islandWidth: 2,
      fov: 90,
      fovSpeedUp: 150,
      speedUp: 2,
      carLightsFade: 0.4,
      lightPairsPerRoadWay: 40,
      movingAwaySpeed: [60, 80],
      movingCloserSpeed: [-120, -160],
      carLightsLength: [400 * 0.03, 400 * 0.2],
      carLightsRadius: [0.05, 0.14],
      carWidthPercentage: [0.3, 0.5],
      carShiftX: [-0.8, 0.8],
      carFloorSeparation: [0, 5],
      colors: {
        roadColor: 0x081424,
        islandColor: 0x0a1a2a,
        background: 0x020617,
        leftCars: [0xFFFFFF, 0xF5C45E, 0xFFEAA7],
        rightCars: [0xBE3D2A, 0xE78B48, 0xC0392B]
      },
      ...effectOptions
    };

    const turbulentUniforms = {
      uFreq: { value: new THREE.Vector4(4, 8, 8, 1) },
      uAmp: { value: new THREE.Vector4(25, 5, 10, 10) }
    };

    const distortion_vertex = `
      #define PI 3.14159265358979
      uniform vec4 uFreq;
      uniform vec4 uAmp;
      float nsin(float val){ return sin(val) * 0.5 + 0.5; }
      float getDistortionX(float progress){
        return (
          cos(PI * progress * uFreq.r + uTime) * uAmp.r +
          pow(cos(PI * progress * uFreq.g + uTime * (uFreq.g / uFreq.r)), 2. ) * uAmp.g
        );
      }
      float getDistortionY(float progress){
        return (
          -nsin(PI * progress * uFreq.b + uTime) * uAmp.b +
          -pow(nsin(PI * progress * uFreq.a + uTime / (uFreq.b / uFreq.a)), 5.) * uAmp.a
        );
      }
      vec3 getDistortion(float progress){
        return vec3(
          getDistortionX(progress) - getDistortionX(0.0125),
          getDistortionY(progress) - getDistortionY(0.0125),
          0.
        );
      }
    `;

    const distortionConfig = {
      uniforms: turbulentUniforms,
      getDistortion: distortion_vertex,
      getJS: (progress: number, time: number) => {
        const uFreq = turbulentUniforms.uFreq.value;
        const uAmp = turbulentUniforms.uAmp.value;
        const nsin = (val: number) => Math.sin(val) * 0.5 + 0.5;
        const getX = (p: number) => Math.cos(Math.PI * p * uFreq.x + time) * uAmp.x + Math.pow(Math.cos(Math.PI * p * uFreq.y + time * (uFreq.y / uFreq.x)), 2) * uAmp.y;
        const getY = (p: number) => -nsin(Math.PI * p * uFreq.z + time) * uAmp.z - Math.pow(nsin(Math.PI * p * uFreq.w + time / (uFreq.z / uFreq.w)), 5) * uAmp.w;
        const distortion = new THREE.Vector3(getX(progress) - getX(progress + 0.007), getY(progress) - getY(progress + 0.007), 0);
        return distortion.multiply(LOOK_AT_AMP).add(LOOK_AT_OFFSET);
      }
    };

    const roadFragment = `
      #define USE_FOG;
      varying vec2 vUv; 
      uniform vec3 uColor;
      uniform float uTime;
      ${THREE.ShaderChunk['fog_pars_fragment']}
      void main() {
        vec2 uv = vUv;
        vec3 color = vec3(uColor);
        gl_FragColor = vec4(color, 1.);
        ${THREE.ShaderChunk['fog_fragment']}
      }
    `;

    const islandFragment = `
      #define USE_FOG;
      varying vec2 vUv;
      uniform vec3 uColor;
      uniform float uTime;
      ${THREE.ShaderChunk['fog_pars_fragment']}
      void main() {
        vec2 uv = vUv;
        vec3 color = vec3(uColor);
        gl_FragColor = vec4(color, 1.);
        ${THREE.ShaderChunk['fog_fragment']}
      }
    `;

    const roadVertex = `
      #define USE_FOG;
      uniform float uTime;
      ${THREE.ShaderChunk['fog_pars_vertex']}
      uniform float uTravelLength;
      varying vec2 vUv;
      #include <getDistortion_vertex>
      void main() {
        vec3 transformed = position.xyz;
        vec3 distortion = getDistortion((transformed.y + uTravelLength / 2.) / uTravelLength);
        transformed.x += distortion.x;
        transformed.z += distortion.y;
        transformed.y += -1. * distortion.z;
        vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.);
        gl_Position = projectionMatrix * mvPosition;
        vUv = uv;
        ${THREE.ShaderChunk['fog_vertex']}
      }
    `;

    class Road {
      webgl: any; options: any; uTime: any; leftRoadWay: any; rightRoadWay: any; island: any;
      constructor(webgl: any, options: any) { this.webgl = webgl; this.options = options; this.uTime = { value: 0 }; }
      createPlane(side: number, width: number, isRoad: boolean) {
        const options = this.options;
        const segments = 100;
        const geometry = new THREE.PlaneGeometry(isRoad ? options.roadWidth : options.islandWidth, options.length, 20, segments);
        let uniforms: any = { uTravelLength: { value: options.length }, uColor: { value: new THREE.Color(isRoad ? options.colors.roadColor : options.colors.islandColor) }, uTime: this.uTime };
        
        const material = new THREE.ShaderMaterial({
          fragmentShader: isRoad ? roadFragment : islandFragment,
          vertexShader: roadVertex,
          side: THREE.DoubleSide,
          uniforms: Object.assign(uniforms, this.webgl.fogUniforms, options.distortion.uniforms)
        });
        material.onBeforeCompile = (shader) => { shader.vertexShader = shader.vertexShader.replace('#include <getDistortion_vertex>', options.distortion.getDistortion); };
        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -Math.PI / 2;
        mesh.position.z = -options.length / 2;
        mesh.position.x += (this.options.islandWidth / 2 + options.roadWidth / 2) * side;
        this.webgl.scene.add(mesh);
        return mesh;
      }
      init() { this.leftRoadWay = this.createPlane(-1, this.options.roadWidth, true); this.rightRoadWay = this.createPlane(1, this.options.roadWidth, true); this.island = this.createPlane(0, this.options.islandWidth, false); }
      update(time: number) { this.uTime.value = time; }
    }

    class CarLights {
      webgl: any; options: any; colors: any; speed: any; fade: any; mesh: any;
      constructor(webgl: any, options: any, colors: any, speed: any, fade: any) { this.webgl = webgl; this.options = options; this.colors = colors; this.speed = speed; this.fade = fade; }
      init() {
        const options = this.options;
        let curve = new THREE.LineCurve3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -1));
        let geometry = new THREE.TubeGeometry(curve, 40, 1, 8, false);
        let instanced = new THREE.InstancedBufferGeometry().copy(geometry as any);
        instanced.instanceCount = options.lightPairsPerRoadWay * 2;
        
        let lanesPerRoad = 3; 
        let laneWidth = options.roadWidth / lanesPerRoad;
        
        let aOffset = [], aMetrics = [], aColor = [];
        let colors = Array.isArray(this.colors) ? this.colors.map(c => new THREE.Color(c)) : new THREE.Color(this.colors);
        const pickRandom = (arr: any) => (Array.isArray(arr) ? arr[Math.floor(Math.random() * arr.length)] : arr);
        const random = (base: any) => (Array.isArray(base) ? Math.random() * (base[1] - base[0]) + base[0] : Math.random() * base);
        for (let i = 0; i < options.lightPairsPerRoadWay; i++) {
          let radius = random(options.carLightsRadius), length = random(options.carLightsLength), speed = random(this.speed);
          let carLane = i % lanesPerRoad, laneX = carLane * laneWidth - options.roadWidth / 2 + laneWidth / 2 + random(options.carShiftX) * laneWidth;
          let carWidth = random(options.carWidthPercentage) * laneWidth, offsetY = random(options.carFloorSeparation) + radius * 1.3, offsetZ = -random(options.length);
          aOffset.push(laneX - carWidth / 2, offsetY, offsetZ, laneX + carWidth / 2, offsetY, offsetZ);
          aMetrics.push(radius, length, speed, radius, length, speed);
          let color = pickRandom(colors);
          aColor.push(color.r, color.g, color.b, color.r, color.g, color.b);
        }
        instanced.setAttribute('aOffset', new THREE.InstancedBufferAttribute(new Float32Array(aOffset), 3, false));
        instanced.setAttribute('aMetrics', new THREE.InstancedBufferAttribute(new Float32Array(aMetrics), 3, false));
        instanced.setAttribute('aColor', new THREE.InstancedBufferAttribute(new Float32Array(aColor), 3, false));
        let material = new THREE.ShaderMaterial({
          fragmentShader: `#define USE_FOG;\n${THREE.ShaderChunk['fog_pars_fragment']}\nvarying vec3 vColor;\nvarying vec2 vUv;\nuniform vec2 uFade;\nvoid main() {\nvec3 color = vec3(vColor);\nfloat alpha = smoothstep(uFade.x, uFade.y, vUv.x);\ngl_FragColor = vec4(color, alpha);\nif (gl_FragColor.a < 0.0001) discard;\n${THREE.ShaderChunk['fog_fragment']}\n}`,
          vertexShader: `#define USE_FOG;\n${THREE.ShaderChunk['fog_pars_vertex']}\nattribute vec3 aOffset;\nattribute vec3 aMetrics;\nattribute vec3 aColor;\nuniform float uTravelLength;\nuniform float uTime;\nvarying vec2 vUv;\nvarying vec3 vColor;\n#include <getDistortion_vertex>\nvoid main() {\nvec3 transformed = position.xyz;\nfloat radius = aMetrics.r;\nfloat myLength = aMetrics.g;\nfloat speed = aMetrics.b;\ntransformed.xy *= radius;\ntransformed.z *= myLength;\ntransformed.z += myLength - mod(uTime * speed + aOffset.z, uTravelLength);\ntransformed.xy += aOffset.xy;\nfloat progress = abs(transformed.z / uTravelLength);\ntransformed.xyz += getDistortion(progress);\nvec4 mvPosition = modelViewMatrix * vec4(transformed, 1.);\ngl_Position = projectionMatrix * mvPosition;\nvUv = uv;\nvColor = aColor;\n${THREE.ShaderChunk['fog_vertex']}\n}`,
          transparent: true,
          uniforms: Object.assign({ uTime: { value: 0 }, uTravelLength: { value: options.length }, uFade: { value: this.fade } }, this.webgl.fogUniforms, options.distortion.uniforms)
        });
        material.onBeforeCompile = shader => { shader.vertexShader = shader.vertexShader.replace('#include <getDistortion_vertex>', options.distortion.getDistortion); };
        let mesh = new THREE.Mesh(instanced, material);
        mesh.frustumCulled = false;
        this.webgl.scene.add(mesh);
        this.mesh = mesh;
      }
      update(time: number) { this.mesh.material.uniforms.uTime.value = time; }
    }

    class App {
      container: any; options: any; renderer: any; composer: any; camera: any; scene: any; fogUniforms: any; clock: any; assets: any; road: any; leftCarLights: any; rightCarLights: any; fovTarget: number; speedUpTarget: number; speedUp: number; timeOffset: number; animationId: number = 0; isMobile: boolean;
      constructor(container: any, options: any) {
        this.container = container;
        this.options = options;
        this.isMobile = window.innerWidth < 768;
        this.options.distortion = distortionConfig;
        this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "default" });
        
        // VISUAL OPTIMIZATION: 
        // On mobile, we now use a higher DPR (min 2 or 1.5) to ensure crisp lines (Anti-Aliasing effect).
        // We offset the performance cost by reducing the geometry in HyperCanvas options.
        const dpr = Math.min(window.devicePixelRatio, 2);
        this.renderer.setPixelRatio(dpr);
        
        this.renderer.setSize(container.offsetWidth, container.offsetHeight, false);
        container.appendChild(this.renderer.domElement);
        this.composer = new EffectComposer(this.renderer);
        this.camera = new THREE.PerspectiveCamera(options.fov, container.offsetWidth / container.offsetHeight, 0.1, 10000);
        this.camera.position.z = -5; this.camera.position.y = 8;
        this.scene = new THREE.Scene();
        const fog = new THREE.Fog(options.colors.background, options.length * 0.2, options.length * 500);
        this.scene.fog = fog;
        this.fogUniforms = { fogColor: { value: fog.color }, fogNear: { value: fog.near }, fogFar: { value: fog.far } };
        this.clock = new THREE.Clock();
        this.assets = {};
        this.road = new Road(this, options);
        this.leftCarLights = new CarLights(this, options, options.colors.leftCars, options.movingAwaySpeed, new THREE.Vector2(0, 1 - options.carLightsFade));
        this.rightCarLights = new CarLights(this, options, options.colors.rightCars, options.movingCloserSpeed, new THREE.Vector2(1, 0 + options.carLightsFade));
        this.fovTarget = options.fov; this.speedUpTarget = 0; this.speedUp = 0; this.timeOffset = 0;
        this.tick = this.tick.bind(this);
        this.onResize = this.onResize.bind(this);
        window.addEventListener('resize', this.onResize);
      }
      loadAssets() {
        return new Promise((resolve) => {
          // We now allow loading assets on mobile too to ensure SMAA works if needed, 
          // but simplified for reliability.
          const manager = new THREE.LoadingManager(resolve as any);
          const searchImage = new Image(); const areaImage = new Image();
          this.assets.smaa = {};
          searchImage.addEventListener('load', function () { 
            // @ts-ignore
            this.assets.smaa.search = this; manager.itemEnd('smaa-search'); 
          }.bind(this));
          areaImage.addEventListener('load', function () { 
            // @ts-ignore
            this.assets.smaa.area = this; manager.itemEnd('smaa-area'); 
          }.bind(this));
          manager.itemStart('smaa-search'); manager.itemStart('smaa-area');
          searchImage.src = SMAAEffect.searchImageDataURL; areaImage.src = SMAAEffect.areaImageDataURL;
        });
      }
      init() {
        this.road.init(); this.leftCarLights.init(); this.leftCarLights.mesh.position.setX(-this.options.roadWidth / 2 - this.options.islandWidth / 2); this.rightCarLights.init(); this.rightCarLights.mesh.position.setX(this.options.roadWidth / 2 + this.options.islandWidth / 2);
        const renderPass = new RenderPass(this.scene, this.camera);
        // Bloom resolution stays at 0.5 on mobile for performance, as glow doesn't need sharp edges.
        const bloomPass = new EffectPass(this.camera, new BloomEffect({ luminanceThreshold: 0.2, luminanceSmoothing: 0, resolutionScale: this.isMobile ? 0.5 : 1 }));
        this.composer.addPass(renderPass); this.composer.addPass(bloomPass);
        
        // FORCE SMAA ON MOBILE: This provides the "Superb Smooth" antialiasing.
        if (this.assets.smaa) {
          const smaaPass = new EffectPass(this.camera, new SMAAEffect({ preset: SMAAPreset.MEDIUM }));
          smaaPass.renderToScreen = true; bloomPass.renderToScreen = false; this.composer.addPass(smaaPass);
        } else { bloomPass.renderToScreen = true; }
        this.tick();
      }
      onResize() {
        if (!this.container) return;
        const width = this.container.offsetWidth; const height = this.container.offsetHeight;
        this.renderer.setSize(width, height); this.composer.setSize(width, height);
        this.camera.aspect = width / height; this.camera.updateProjectionMatrix();
      }
      update(delta: number) {
        const lerp = (current: number, target: number, speed: number, limit: number) => { let change = (target - current) * speed; if (Math.abs(change) < limit) change = target - current; return change; };
        let lerpPercentage = Math.exp(-(-60 * Math.log2(1 - 0.1)) * delta);
        this.speedUp += lerp(this.speedUp, this.speedUpTarget, lerpPercentage, 0.00001);
        this.timeOffset += this.speedUp * delta;
        let time = this.clock.elapsedTime + this.timeOffset;
        this.rightCarLights.update(time); this.leftCarLights.update(time); this.road.update(time);
        let fovChange = lerp(this.camera.fov, this.fovTarget, lerpPercentage, 0.01);
        if (fovChange !== 0) { this.camera.fov += fovChange * delta * 6; this.camera.updateProjectionMatrix(); }
        if (this.options.distortion.getJS) {
          const distortion = this.options.distortion.getJS(0.025, time);
          this.camera.lookAt(new THREE.Vector3(this.camera.position.x + distortion.x, this.camera.position.y + distortion.y, this.camera.position.z + distortion.z));
          this.camera.updateProjectionMatrix();
        }
      }
      tick() {
        this.animationId = requestAnimationFrame(this.tick);
        const delta = this.clock.getDelta();
        this.update(delta);
        this.composer.render();
      }
      dispose() {
        cancelAnimationFrame(this.animationId);
        window.removeEventListener('resize', this.onResize);
        this.renderer.dispose();
        this.composer.dispose();
        this.scene.traverse((object: any) => {
            if (object.geometry) object.geometry.dispose();
            if (object.material) {
                if (Array.isArray(object.material)) { object.material.forEach((m: any) => m.dispose()); } else { object.material.dispose(); }
            }
        });
        if (this.container && this.renderer.domElement) { this.container.removeChild(this.renderer.domElement); }
      }
    }

    const app = new App(container, options);
    appInstance.current = app;
    app.loadAssets().then(() => app.init());

    return () => {
      if (appInstance.current) {
        appInstance.current.dispose();
        appInstance.current = null;
      }
    };
  }, [effectOptions]);

  return <div ref={containerRef} className="w-full h-full absolute top-0 left-0" />;
};

export default Hyperspeed;