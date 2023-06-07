import React, { useRef, useEffect } from "react";
import { useFrame, extend, useThree } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { BoxGeometry, Mesh, MeshNormalMaterial } from "three";

extend({ OrbitControls });

const Loader = () => {
  const { camera, gl } = useThree();
  const cubesRef = useRef([]);
  const prismRef = useRef();
  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.zoomSpeed = 0.8;
    camera.position.set(0, 0, 10);

    controls.update();

    return () => {
      controls.dispose();
    };
  }, [camera, gl]);

  useFrame(() => {});

  return (
    <>
      <mesh
        position={[0.0 , 5, 0.]}
        rotation={[0, 0, 1.57]}
        scale={[9.36, 0.13, 0.2]}
      >
        <boxGeometry attach="geometry" args={[1, 1, 1]} />
        <meshNormalMaterial attach="material" />
      </mesh>
      <mesh
        position={[4.2 ,-3.5, 0]}
        rotation={[0.13, -0.13, 2.42]}
        scale={[9.36, 0.13, 0.2]}
      >
        <boxGeometry attach="geometry" args={[1, 1, 1]} />
        <meshNormalMaterial attach="material" />
      </mesh>
      <mesh
        position={[0,0, 0]}
        rotation={[0.08, -0.08, 1.03]}
        scale={[9.36, 0.13, 0.2]}
      >
        <boxGeometry attach="geometry" args={[1, 1, 1]} />
        <meshNormalMaterial attach="material" />
      </mesh>
      <mesh ref={prismRef} position={[0, 0, 0]} rotation={[-1.5, 0, 0]}>
        <cylinderGeometry attach="geometry" args={[1, 1, 1, 3]} />
        <meshNormalMaterial attach="material" />
      </mesh>
    </>
  );
};

export default Loader;
