'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, ShaderMaterial, PlaneGeometry } from 'three';

const nebulaVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const nebulaFragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;
  
  // Noise function
  vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  
  vec4 mod289(vec4 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  
  vec4 permute(vec4 x) {
    return mod289(((x*34.0)+1.0)*x);
  }
  
  vec4 taylorInvSqrt(vec4 r) {
    return 1.79284291400159 - 0.85373472095314 * r;
  }
  
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
  
  void main() {
    vec2 uv = vUv;
    vec3 pos = vec3(uv * 2.0, uTime * 0.1);
    
    // Generate multiple octaves of noise
    float noise1 = snoise(pos * 0.5);
    float noise2 = snoise(pos * 1.0 + vec3(100.0, 100.0, 0.0));
    float noise3 = snoise(pos * 2.0 + vec3(200.0, 200.0, 0.0));
    
    // Combine noises
    float finalNoise = (noise1 * 0.5 + noise2 * 0.3 + noise3 * 0.2);
    
    // Create color gradients
    vec3 color1 = vec3(0.043, 0.086, 0.149); // Deep space blue
    vec3 color2 = vec3(0.0, 0.831, 1.0);     // Cyber blue
    vec3 color3 = vec3(0.941, 0.471, 0.973); // Magenta
    vec3 color4 = vec3(0.063, 0.725, 0.506); // Emerald
    
    // Mix colors based on noise and position
    vec3 finalColor = mix(color1, color2, smoothstep(-0.5, 0.5, finalNoise));
    finalColor = mix(finalColor, color3, smoothstep(0.2, 0.8, sin(uv.x * 3.14159 + uTime * 0.5)));
    finalColor = mix(finalColor, color4, smoothstep(0.1, 0.6, cos(uv.y * 3.14159 + uTime * 0.3)));
    
    // Add some brightness variation
    float brightness = 0.3 + 0.4 * (finalNoise + 1.0) * 0.5;
    finalColor *= brightness;
    
    gl_FragColor = vec4(finalColor, 0.8);
  }
`;

export default function Nebula() {
  const meshRef = useRef<Mesh>(null);
  
  const shaderMaterial = useMemo(() => {
    return new ShaderMaterial({
      vertexShader: nebulaVertexShader,
      fragmentShader: nebulaFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [window.innerWidth, window.innerHeight] },
      },
      transparent: true,
    });
  }, []);

  useFrame((state) => {
    if (shaderMaterial) {
      shaderMaterial.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -5]} scale={[10, 10, 1]}>
      <planeGeometry args={[2, 2, 1, 1]} />
      <primitive object={shaderMaterial} />
    </mesh>
  );
}