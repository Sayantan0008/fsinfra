'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, Vector3 } from 'three';

interface MountainLayerProps {
  points: Vector3[];
  color: string;
  opacity: number;
  zPosition: number;
}

function MountainLayer({ points, color, opacity, zPosition }: MountainLayerProps) {
  const meshRef = useRef(null);
  
  const geometry = useMemo(() => {
    const vertices = [];
    const indices = [];
    
    // Create mountain silhouette
    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      
      // Create triangular segments
      vertices.push(p1.x, p1.y, 0);
      vertices.push(p2.x, p2.y, 0);
      vertices.push(p1.x, -2, 0); // Bottom point
      vertices.push(p2.x, -2, 0);
      
      const baseIndex = i * 4;
      indices.push(baseIndex, baseIndex + 1, baseIndex + 2);
      indices.push(baseIndex + 1, baseIndex + 3, baseIndex + 2);
    }
    
    return { vertices: new Float32Array(vertices), indices };
  }, [points]);

  return (
    <mesh ref={meshRef} position={[0, 0, zPosition]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={geometry.vertices.length / 3}
          array={geometry.vertices}
          itemSize={3}
        />
        <bufferAttribute
          attach="index"
          array={new Uint16Array(geometry.indices)}
          count={geometry.indices.length}
        />
      </bufferGeometry>
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

export default function Mountains() {
  const groupRef = useRef<Group>(null);
  
  const mountainLayers = useMemo(() => {
    const layers = [];
    const numLayers = 4;
    
    for (let layer = 0; layer < numLayers; layer++) {
      const points = [];
      const numPoints = 20;
      const baseHeight = 0.3 + layer * 0.2;
      const randomness = 0.5 - layer * 0.1;
      
      for (let i = 0; i <= numPoints; i++) {
        const x = (i / numPoints - 0.5) * 8;
        const height = baseHeight + Math.random() * randomness * Math.sin(i * 0.5);
        points.push(new Vector3(x, height, 0));
      }
      
      layers.push({
        points,
        color: `hsl(${220 + layer * 10}, ${60 - layer * 10}%, ${20 + layer * 15}%)`,
        opacity: 0.8 - layer * 0.15,
        zPosition: -layer * 0.5,
      });
    }
    
    return layers;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle parallax movement
      groupRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {mountainLayers.map((layer, index) => (
        <MountainLayer
          key={index}
          points={layer.points}
          color={layer.color}
          opacity={layer.opacity}
          zPosition={layer.zPosition}
        />
      ))}
    </group>
  );
}