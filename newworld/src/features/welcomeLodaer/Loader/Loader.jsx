import React, { useRef, useEffect } from "react";
import { useFrame, extend, useThree } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { BoxGeometry, Mesh, MeshNormalMaterial,CylinderGeometry, Line, Vector3, BufferGeometry, LineBasicMaterial } from "three";

extend({ OrbitControls });

const useScene = () => useThree((state) => state.scene);
const Loader = () => {
  const { camera, gl } = useThree();
  const cubesRef = useRef([]);
  const prismRef = useRef();
  const lineRef = useRef();
  const scene = useScene(); // Access the scene using the custom useScene hook

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
  useEffect(() => {
    const startPoint = new Vector3(0, 0, 0);
    const endPoint = new Vector3(20, -10, 8);

    // Create line geometry and material
    const lineGeometry = new BufferGeometry().setFromPoints([startPoint, endPoint]);
    const lineMaterial = new LineBasicMaterial({ color: 0xff0000, linewidth: 30 }); // Set the linewidth property to increase the line width

    // Create the line object
    lineRef.current = new Line(lineGeometry, lineMaterial);
    lineRef.current.frustumCulled = false;
    lineRef.current.computeLineDistances();

    // Create cylinder geometry and material
    const cylinderGeometry = new CylinderGeometry(1, 1, startPoint.distanceTo(endPoint), 32);
    const cylinderMaterial = new MeshNormalMaterial();

    // Create the cylinder mesh
    const cylinderMesh = new Mesh(cylinderGeometry, cylinderMaterial);
    cylinderMesh.position.copy(startPoint.clone().add(endPoint).multiplyScalar(0)); // Set the position to the midpoint between the start and end points
    cylinderMesh.lookAt(endPoint); // Orient the cylinder towards the end point

    // Add the line and cylinder to the scene
    scene.add(lineRef.current);
    scene.add(cylinderMesh);

    return () => {
      // Remove the line and cylinder from the scene when unmounting
      scene.remove(lineRef.current);
      scene.remove(cylinderMesh);
    };
  }, [scene]);

  return (
    <>
      <mesh
        position={[0.0, 5, 0]}
        rotation={[0, 0, 1.57]}
        scale={[9.36, 0.13, 0.2]}
      >
        <boxGeometry attach="geometry" args={[1, 1, 1]} />
        <meshNormalMaterial attach="material" />
      </mesh>
      <mesh
        position={[4.2, -3.5, 0]}
        rotation={[0.13, -0.13, 2.42]}
        scale={[9.36, 0.13, 0.2]}
      >
        <boxGeometry attach="geometry" args={[1, 1, 1]} />
        <meshNormalMaterial attach="material" />
      </mesh>
      <mesh
        position={[-2.6, -3.04, -0.5]}
        rotation={[0.08, -0.18, 0.94]}
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
