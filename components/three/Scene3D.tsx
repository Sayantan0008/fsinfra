'use client';

import { Suspense, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import StarField from './StarField';
import Nebula from './Nebula';
import Mountains from './Mountains';

interface Scene3DProps {
  scrollY: number;
  section: number;
}

function Scene3DContent({ scrollY, section }: Scene3DProps) {
  const cameraRef = useRef<any>(null);
  
  useEffect(() => {
    if (cameraRef.current) {
      // Smooth camera transitions based on scroll sections
      const targetPositions = [
        { x: 0, y: 0, z: 5 },    // Section 1: F.S.INFRASTRUCTURE
        { x: -2, y: 1, z: 4 },   // Section 2: INNOVATION
        { x: 2, y: -1, z: 6 },   // Section 3: EXCELLENCE
      ];
      
      const currentPos = targetPositions[section] || targetPositions[0];
      
      // Smooth camera movement
      if (cameraRef.current.position) {
        cameraRef.current.position.lerp(
          { x: currentPos.x, y: currentPos.y, z: currentPos.z },
          0.02
        );
      }
    }
  }, [section, scrollY]);

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[0, 0, 5]}
        fov={75}
        near={0.1}
        far={1000}
      />
      
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00D4FF" />
      
      <fog attach="fog" args={['#0B1426', 5, 50]} />
      
      <Nebula />
      <StarField count={5000} radius={30} />
      <Mountains />
      
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={false}
        target={[0, 0, 0]}
      />
    </>
  );
}

export default function Scene3D({ scrollY, section }: Scene3DProps) {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <Scene3DContent scrollY={scrollY} section={section} />
        </Suspense>
      </Canvas>
    </div>
  );
}