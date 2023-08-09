import React, { useRef, useEffect } from "react";
import { extend, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
extend({ OrbitControls });
const ModelViewer = ({ modelPath ,position }) => {
  const gltf = useLoader(GLTFLoader, modelPath);
  const modelRef = useRef();

  const { camera, gl } = useThree();
  camera.position.z = 10;

  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.zoomSpeed = 0.8;
    modelRef.current.position.set(position.x, position.y, position.z);
    modelRef.current.scale.set(0.5,0.5,0.5)
  }, []);

  return (
    <>
      <primitive object={gltf.scene} ref={modelRef} />
      <ambientLight intensity={0.5} />
      <directionalLight intensity={0.8} position={[10, 10, 10]} />
    </>
  );
};

export default ModelViewer;
