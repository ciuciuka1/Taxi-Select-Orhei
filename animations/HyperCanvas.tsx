import React, { useRef, useEffect } from 'react';

const HyperCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    // Vertex Shader
    const vertexShaderSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // Fragment Shader: Rural Highway Night
    const fragmentShaderSource = `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform float u_time;

      // --- UTILS ---
      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }

      float noise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }

      void main() {
        // Normalized coords
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        // Center at 0, range -1 to 1, corrected aspect
        vec2 p = -1.0 + 2.0 * uv;
        p.x *= u_resolution.x / u_resolution.y;

        // --- CONFIG ---
        vec3 color = vec3(0.01, 0.01, 0.02); // Deep night sky
        float horizon = 0.0; // Horizon line y-coord
        float camHeight = 1.1;
        float roadWidth = 4.0; // Half-width of the road area
        float speed = 8.0; // Speed x2 (was 4.0)
        float t = u_time * speed;
        float camOffset = 2.0; // Camera positioned in the right lane

        // --- SKY ---
        if (p.y > horizon) {
            // Gradient (Atmospheric glow near horizon)
            float grad = smoothstep(0.0, 0.7, p.y - horizon);
            color = mix(vec3(0.04, 0.05, 0.09), vec3(0.0, 0.0, 0.01), grad);

            // Stars (Realistic Pinpoints)
            float starScale = 60.0; 
            vec2 starGrid = p * starScale;
            vec2 starId = floor(starGrid);
            vec2 starLocal = fract(starGrid) - 0.5;
            
            float starRnd = random(starId); 
            
            // Reduce density (only 5% of cells have a star)
            if (starRnd > 0.95) {
                // Randomize size, but keep them very small (pinpoints)
                float sizeBase = 0.05 + 0.15 * random(starId + vec2(1.0));
                // Make stars near horizon dimmer due to atmosphere
                float atmosphereFade = smoothstep(horizon, horizon + 0.3, p.y);
                
                float dist = length(starLocal);
                
                // Harder cutoff for sharp points, not soft blobs
                if (dist < sizeBase) {
                    // Subtle Twinkle
                    float twinkle = 0.7 + 0.3 * sin(u_time * 1.5 + starRnd * 50.0);
                    
                    // Core brightness
                    float intensity = (1.0 - smoothstep(0.0, sizeBase, dist));
                    
                    vec3 starColor = vec3(0.9, 0.95, 1.0); // Blue-white stars
                    // Occasional reddish star
                    if (starRnd > 0.99) starColor = vec3(1.0, 0.8, 0.7); 

                    color += starColor * intensity * twinkle * atmosphereFade;
                }
            }

            // --- SHOOTING STAR (Comet) ---
            float cometCycle = 25.0;
            float cometTime = mod(u_time, cometCycle);
            
            if (cometTime < 0.8) {
                float tC = cometTime / 0.8;
                vec2 start = vec2(1.2, 0.9);
                vec2 end = vec2(-0.4, 0.4);
                vec2 pos = mix(start, end, tC);
                float d = length(p - pos);
                if (d < 0.015) { // Thinner trail
                    color += vec3(1.0, 0.9, 0.8) * (0.0005 / d) * smoothstep(1.0, 0.0, tC);
                }
            }
        }

        // --- GROUND & ROAD ---
        if (p.y < horizon) {
            float z = camHeight / (horizon - p.y); // Depth (distance from camera plane)
            
            // xRel is the world X coordinate relative to the camera's center of vision.
            float xRel = p.x * z; 
            
            // mapX is the absolute world X coordinate.
            float mapX = xRel + camOffset;
            
            // Antialiasing/Blur factor based on depth and resolution
            float blur = max(0.05, z * (6.0 / u_resolution.y)); 
            float fog = smoothstep(300.0, 20.0, z);
            
            // Road Surface
            if (abs(mapX) < roadWidth) {
                vec3 roadCol = vec3(0.08, 0.08, 0.09);
                
                // Texture Fade
                float textureFade = smoothstep(150.0, 10.0, z);
                
                // Enhanced Road Texture (Wear & Tear)
                // Fine grain
                float n1 = noise(vec2(mapX * 60.0, (z + t) * 60.0));
                // Medium grain
                float n2 = noise(vec2(mapX * 15.0, (z + t) * 15.0));
                // Large patches (wear/undulations)
                float nPatch = noise(vec2(mapX * 1.5, (z + t) * 1.5));
                
                float grain = mix(n2, n1, 0.6);
                // Add localized darkness for patches
                float patchMask = smoothstep(0.4, 0.8, nPatch);
                
                roadCol += vec3(grain * 0.025 * textureFade);
                roadCol -= vec3(0.015) * patchMask * textureFade; 
                
                // Headlight Reflection (My Car)
                float lightW = 2.5 + z * 0.06;
                float lightMask = smoothstep(lightW, 0.0, abs(xRel)) * smoothstep(200.0, 10.0, z);
                
                roadCol += vec3(0.1, 0.11, 0.14) * lightMask * 0.5;
                roadCol += vec3(0.2) * max(0.0, grain - 0.3) * lightMask * textureFade * 0.4;

                // --- MARKINGS (Antialiased) ---
                vec3 markColor = vec3(0.85, 0.85, 0.8);
                
                // Softer edges via wider blur range for markings to avoid pixelation
                float markBlur = max(0.08, blur * 1.5); 
                
                // Center Line (Dashed)
                float centerWidth = 0.12;
                if (abs(mapX) < centerWidth + markBlur) {
                    float dashLen = 8.0;
                    float dashPos = mod(z + t, dashLen * 2.0);
                    float dashAlpha = smoothstep(0.0, 0.5, dashPos) * smoothstep(dashLen + 0.5, dashLen, dashPos);
                    
                    // Soft edge antialiasing
                    float widthAlpha = smoothstep(centerWidth + markBlur, centerWidth - markBlur * 0.5, abs(mapX));
                    
                    float paintWear = noise(vec2(mapX * 50.0, z * 5.0));
                    vec3 finalPaint = markColor * (0.8 + 0.2 * paintWear);
                    roadCol = mix(roadCol, finalPaint, dashAlpha * widthAlpha * fog);
                }
                
                // Side Lines (Solid)
                float sideWidth = 0.15;
                float distToEdge = abs(abs(mapX) - (roadWidth - 0.3));
                if (distToEdge < sideWidth + markBlur) {
                     float widthAlpha = smoothstep(sideWidth + markBlur, sideWidth - markBlur * 0.5, distToEdge);
                     float paintWear = noise(vec2(mapX * 50.0, (z+t)*0.2));
                     vec3 finalPaint = markColor * (0.8 + 0.2 * paintWear);
                     roadCol = mix(roadCol, finalPaint, widthAlpha * fog);
                }
                
                color = roadCol;
            } else {
                // Terrain
                vec3 groundCol = vec3(0.01, 0.015, 0.01); 
                float n = noise(vec2(mapX * 0.2, (z + t) * 0.2));
                color = groundCol * (0.6 + 0.4 * n);
            }
            
            color = mix(vec3(0.03, 0.04, 0.08), color, fog);
        }

        // --- TREES ---
        float treeSpacing = 40.0;
        float startTreeZ = floor(t / treeSpacing) * treeSpacing + treeSpacing;
        
        for (float i = 12.0; i >= 0.0; i--) {
            float pZ = startTreeZ + i * treeSpacing;
            float relZ = pZ - t;
            
            if (relZ > 1.0 && relZ < 300.0) {
                 float scale = 1.0 / relZ;
                 float opacity = smoothstep(300.0, 40.0, relZ);
                 float seed = floor(pZ);
                 
                 for (float side = -1.0; side <= 1.0; side += 2.0) {
                      float xPos = (roadWidth + 8.0 + random(vec2(seed, side)) * 6.0) * side;
                      float sx = (xPos - camOffset) * scale;
                      float tW = (4.0 + random(vec2(seed, side * 1.1)) * 3.0) * scale;
                      float tH = (10.0 + random(vec2(seed, side * 2.2)) * 8.0) * scale;
                      float sy_base = horizon - camHeight * scale;
                      float sy_top = sy_base + tH;
                      
                      if (p.x > sx - tW && p.x < sx + tW && p.y > sy_base && p.y < sy_top) {
                          vec2 lUV = vec2((p.x - sx)/tW, (p.y - sy_base)/tH);
                          float shapeW = 1.0 - lUV.y * 0.85; 
                          float edge = noise(vec2(lUV.x * 5.0, lUV.y * 10.0 + seed));
                          if (abs(lUV.x) < shapeW * (0.7 + 0.3 * edge)) {
                               color = mix(color, vec3(0.005, 0.01, 0.005), opacity);
                          }
                      }
                 }
            }
        }
        
        // --- STREETLIGHTS ---
        float poleSpacing = 60.0;
        float startZ = floor(t / poleSpacing) * poleSpacing + poleSpacing;
        
        for (float i = 5.0; i >= 0.0; i--) {
            float pZ = startZ + i * poleSpacing;
            float relZ = pZ - t;
            
            if (relZ > 1.0 && relZ < 200.0) {
                float scale = 1.0 / relZ;
                float opacity = smoothstep(200.0, 60.0, relZ);
                for (float side = -1.0; side <= 1.0; side += 2.0) {
                    float pX = (roadWidth + 2.0) * side; 
                    float poleH = 8.0; 
                    float sx = (pX - camOffset) * scale;
                    float sy_base = horizon - camHeight * scale;
                    float sy_top = horizon + (poleH - camHeight) * scale;
                    
                    if (abs(p.x - sx) < 0.15 * scale && p.y > sy_base && p.y < sy_top) {
                        color = mix(color, vec3(0.05), opacity);
                    }
                    float lx_screen = (pX - side * 1.2 - camOffset) * scale;
                    float d = length(vec2(p.x, p.y) - vec2(lx_screen, sy_top));
                    float brightness = (0.004 / (d * d + 0.0001)) * scale;
                    vec3 lampColor = vec3(1.0, 0.7, 0.3);
                    float flickerNoise = noise(vec2(u_time * 15.0, i * 7.0 + side));
                    float flicker = 0.85 + 0.15 * flickerNoise; 
                    color += lampColor * min(brightness, 2.0) * opacity * flicker;
                    float flare = max(0.0, 1.0 - abs(p.y - sy_top) * 60.0) * max(0.0, 1.0 - abs(p.x - lx_screen) * 3.0);
                    color += lampColor * flare * 0.2 * opacity * flicker;
                }
            }
        }

        // Vignette
        color *= 1.0 - dot(uv - 0.5, uv - 0.5) * 0.5;
        
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const createProgram = (gl: WebGLRenderingContext, vs: WebGLShader, fs: WebGLShader) => {
      const program = gl.createProgram();
      if (!program) return null;
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(program));
        return null;
      }
      return program;
    };

    const vertShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    
    if (!vertShader || !fragShader) return;

    const program = createProgram(gl, vertShader, fragShader);
    if (!program) return;

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const timeLocation = gl.getUniformLocation(program, "u_time");

    let animationFrameId: number;
    const startTime = performance.now();

    const render = () => {
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }

      const currentTime = (performance.now() - startTime) * 0.001;

      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, currentTime);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (gl && program) {
        gl.deleteProgram(program);
      }
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none opacity-90"
      aria-hidden="true"
    />
  );
};

export default HyperCanvas;