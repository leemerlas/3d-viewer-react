import { Canvas, useThree, useLoader } from "@react-three/fiber"
import React, { useRef, useEffect, Suspense } from "react"
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Environment, OrbitControls } from "@react-three/drei";
import * as THREE from "three"

import EvaFoam from "./EvaFoam";
import Bottle from "./Bottle";


const Canvas3D = () => {
    
    return (
        <Canvas style={{ backgroundColor: "white", height: "92.5vh" }}>
            <Suspense fallback={null}>
            <Bottle />
            <EvaFoam position={[0, -1.26, 0]}/>
            <OrbitControls />
            {/* <Environment preset="sunset" background /> */}
            {/* <CameraController /> */}
            <ambientLight intensity={0.1} />
            <spotLight position={[10, 10, 10]} intensity={0.2} penumbra={1} />
            {/* <primitive object={new THREE.AxesHelper(10)} /> */}
            {/* <pointLight position={[-10, -20, -30]} /> */}
            </Suspense>
        </Canvas>
    )
}

export default Canvas3D