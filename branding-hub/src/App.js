import { Canvas, useThree, useLoader } from "@react-three/fiber"
import React, { useRef, useEffect, Suspense } from "react"
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Environment, OrbitControls } from "@react-three/drei";
import * as THREE from "three"

import EvaFoam from "./components/Models/EvaFoam";
import Bottle from "./components/Models/Bottle";

// const CameraController = () => {
//   const { camera, gl } = useThree();
//   useEffect(
//     () => {
//       const controls = new OrbitControls(camera, gl.domElement);

//       controls.minDistance = 3;
//       controls.maxDistance = 20;
//       return () => {
//         controls.dispose();
//       };
//     },
//     [camera, gl]
//   );
//   return null;
// };


const App = () => {
  return (
    // <div style={{ height: 250, width: 300 }}>
      <Canvas style={{ backgroundColor: "black", height: window.innerHeight }}>
        <Suspense fallback={null}>
          <Bottle />
          <EvaFoam position={[0, -1.26, 0]}/>
          <OrbitControls />
          <Environment preset="sunset" background />
          {/* <CameraController /> */}
          <ambientLight intensity={0.1} />
          <spotLight position={[10, 10, 10]} intensity={0.2} penumbra={1} />
          <primitive object={new THREE.AxesHelper(10)} />
          {/* <pointLight position={[-10, -20, -30]} /> */}
        </Suspense>
      </Canvas>
  );
}

export default App;
