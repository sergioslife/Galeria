import React, { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const ArtMesh = ({ art, onClick }) => {
  const { scene } = useGLTF(art.model);
  const meshRef = useRef();

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    box.getSize(size);

    const uniformScale = 2 / Math.max(size.x, size.y, size.z); // Ajustar el factor según el tamaño deseado
    scene.scale.set(uniformScale, uniformScale, uniformScale);
  }, [scene]);

  return (
    <mesh ref={meshRef} onClick={onClick}>
      <primitive object={scene} />
    </mesh>
  );
};

export default ArtMesh;
