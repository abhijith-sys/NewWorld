// import React, { useRef, useEffect } from "react";
// import { extend, useLoader, useThree } from "@react-three/fiber";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// extend({ OrbitControls });

// const ModelViewer = ({
//   modelPath,
//   position,
//   scale,
//   z,
//   rotation,
//   gltf,
//   name,
// }) => {
//   // const gltf = useLoader(GLTFLoader, modelPath);
//   const copiedGltf = { ...gltf }
//   const modelRef = useRef();

//   //   const { camera, gl } = useThree();
//   //   camera.position.z = 10;

//   useEffect(() => {
//     modelRef.current.rotation.x = rotation?.x || 20.44;
//     modelRef.current.rotation.y = rotation?.y || 0;
//     modelRef.current.rotation.z = rotation?.z || 0;
//     modelRef.current.position.set(position?.x || 0, position?.y || 0, z || 0);
//     modelRef.current.scale.set(
//       scale?.x || 0.19,
//       scale?.y || 0.19,
//       scale?.z || 0.19
//     );
//   }, [
//     position?.x,
//     position?.y,
//     rotation?.x,
//     rotation?.y,
//     rotation?.z,
//     scale?.x,
//     scale?.y,
//     scale?.z,
//     z,
//   ]);

//   return (
//     <>
//       <primitive
//         object={copiedGltf.scene}
//         ref={modelRef}
//         key={position}
//         name={name}
//       />

//       {/* <ambientLight intensity={0.1} /> */}
//       <directionalLight intensity={0.1} position={[10, 10, 10]} />
//     </>
//   );
// };

// export default ModelViewer;
import React from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const ModelViewer = ({modelPath}) => {
  const gltfk = useLoader(GLTFLoader, modelPath);
  const { scene } = gltfk;

  // Define the positions for each instance
  const positions = {
    a1: { x: -3.29, y: -4.36 },
    a2: { x: -3.29, y: -3.29 },
  };

  // Create instances of the model by cloning the scene
    const modelInstances = Object.keys(positions).map((key) => {
      const position = positions[key];
      const clonedScene = scene.clone();
      clonedScene.position.set(position.x, position.y, 0);
      return clonedScene;
    });

  // Render each instance
  return modelInstances.map((instance, index) => (
    <primitive object={instance} key={index} />
  ));
};
export default ModelViewer;