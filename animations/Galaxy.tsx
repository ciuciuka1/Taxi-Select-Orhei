
import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';
import { useEffect, useRef } from 'react';
import './Galaxy.css';

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

const getFragmentShader = () => `
// Switch to mediump for massive performance boost on integrated graphics
precision mediump float;

uniform float uTime;
uniform vec3 uResolution;
uniform float uSize;
uniform bool uTransparent;

varying vec2 vUv;

// Ultra-fast pseudo-random function
float Hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

void main() {
  // Correct aspect ratio
  vec2 uv = (vUv - 0.5) * uResolution.xy / uResolution.y;
  
  // Efficient Rotation (Linear transformation)
  float s = sin(uTime * 0.05);
  float c = cos(uTime * 0.05);
  uv *= mat2(c, -s, s, c);

  vec3 col = vec3(0.0);
  
  // Single Loop Layering Logic merged for speed
  // We simulate 2 layers by manually offsetting logic instead of heavy branching
  float t = uTime * 0.2;
  
  vec2 gv = fract(uv * 10.0) - 0.5;
  vec2 id = floor(uv * 10.0);

  // 3x3 Neighbor Search - Essential for seamless movement
  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 offset = vec2(float(x), float(y));
      vec2 n = id + offset;
      float seed = Hash21(n);
      
      // Optimization: Only process if star exists (40% probability)
      if(seed > 0.6) {
          float size = fract(seed * 45.1);
          // Simple fade animation without heavy sine waves
          float twinkle = 0.5 + 0.5 * sin(t + seed * 10.0); 
          
          vec2 pos = offset - vec2(Hash21(n * 12.0), Hash21(n * 7.0)) + 0.5;
          float dist = length(gv - pos);
          
          // Fast glow calculation (Inverse linear) instead of exp/pow
          float star = (0.02 * uSize) / (dist + 0.001);
          star *= smoothstep(1.0, 0.1, dist); // Soft edge clipping
          
          // Fast Color Mixing (No HSV conversion)
          // Mix between Gold (1.0, 0.8, 0.2) and Blue/White (0.8, 0.9, 1.0)
          vec3 color = mix(vec3(0.2, 0.4, 0.9), vec3(1.0, 0.7, 0.1), seed);
          
          col += star * twinkle * color;
      }
    }
  }

  // Alpha blending optimization
  float alpha = clamp(length(col), 0.0, 1.0);
  
  gl_FragColor = vec4(col, uTransparent ? alpha : 1.0);
}
`;

interface GalaxyProps {
  starSpeed?: number;
  size?: number;
  hueShift?: number;
  disableAnimation?: boolean;
  transparent?: boolean;
  [key: string]: any;
}

export default function Galaxy({
  starSpeed = 0.5,
  size = 1.0,
  hueShift = 140, // Unused in optimized shader but kept for props compatibility
  disableAnimation = false,
  transparent = true,
  ...rest
}: GalaxyProps) {
  const ctnDom = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    if (!ctnDom.current) return;
    const ctn = ctnDom.current;

    // CRITICAL OPTIMIZATION:
    // Force DPR to 1.0. This renders the canvas at 1:1 CSS pixels.
    // On Retina/4K screens, this reduces pixel count by 4x-9x.
    // The browser upscales it cheaply. Visually indistinguishable for soft stars.
    const dpr = 1.0; 

    const renderer = new Renderer({
      dpr,
      alpha: transparent,
      premultipliedAlpha: false,
      width: ctn.offsetWidth,
      height: ctn.offsetHeight,
      powerPreference: "high-performance", // Hint to browser to use dGPU
      depth: false, // Disable depth buffer (not needed for 2D stars)
      stencil: false, // Disable stencil buffer
      antialias: false // Disable AA (stars are soft anyway)
    });
    const gl = renderer.gl;

    if (transparent) {
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    }

    let program: Program;

    function resize() {
      const rect = ctn.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height);
      if (program) {
        program.uniforms.uResolution.value = new Color([
          gl.canvas.width,
          gl.canvas.height,
          gl.canvas.width / gl.canvas.height
        ]);
      }
    }
    window.addEventListener('resize', resize, { passive: true });
    resize();

    const geometry = new Triangle(gl);
    program = new Program(gl, {
      vertex: vertexShader,
      fragment: getFragmentShader(),
      uniforms: {
        uTime: { value: 0 },
        uResolution: {
          value: new Color([gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height])
        },
        uSize: { value: size },
        uTransparent: { value: transparent }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });

    // Use high precision timer
    function update(t: number) {
      requestRef.current = requestAnimationFrame(update);
      
      if (!disableAnimation) {
        // Multiply time by speed prop
        program.uniforms.uTime.value = t * 0.001 * starSpeed;
      }
      
      renderer.render({ scene: mesh });
    }
    
    requestRef.current = requestAnimationFrame(update);
    ctn.appendChild(gl.canvas);

    return () => {
      if (requestRef.current !== null) cancelAnimationFrame(requestRef.current);
      window.removeEventListener('resize', resize);
      if (ctn && gl.canvas && ctn.contains(gl.canvas)) {
          ctn.removeChild(gl.canvas);
      }
      // Force clean context loss
      const extension = gl.getExtension('WEBGL_lose_context');
      if (extension) extension.loseContext();
    };
  }, [starSpeed, size, disableAnimation, transparent]);

  return <div ref={ctnDom} className="galaxy-container" {...rest} />;
}
