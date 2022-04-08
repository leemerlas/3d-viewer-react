import { Canvas, useThree, useLoader } from "@react-three/fiber"
import React, { useRef, useEffect, Suspense } from "react"
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three"

import EvaFoam from "./EvaFoam";
import Bottle from "./Bottle";
import Logo from "./Logo"
import LogoCenteredBack from "./LogoCenteredBack";
import LogoCenteredCap from "./LogoCenteredCap";

const Canvas3D = (props) => {

    const view = useRef()
    const canvas = useRef()
    const camera = new THREE.PerspectiveCamera( 45, 1, 1, 1000 );

    return (
        <Canvas ref={canvas} style={{ backgroundColor: "white", height: "92.5vh" }} camera={{ position: [0, 0, 11], fov: 35, aspect: 2.5}}>
            <Suspense fallback={null}>
            <Bottle />
            <EvaFoam position={[0, -3.06, 0]}/>
            <Logo image={props.image} position={[0, 0, 0]}/>
            <LogoCenteredBack image={props.image} position={[0, 0, 0]}/>
            <LogoCenteredCap image={props.image} position={[0, 3.185, 0]} />
            {/* <primitive object={new THREE.AxesHelper(10)} /> */}
            <ambientLight intensity={0.175} />
            <spotLight position={[5, 10, 0]} intensity={0.3} penumbra={1} />
            <spotLight position={[10, 10, 0]} intensity={0.3} penumbra={1} />
            <spotLight position={[30, 10, 0]} intensity={0.3} penumbra={1} />
            <spotLight position={[50, 10, 0]} intensity={0.3} penumbra={1} />
            {/* <spotLight position={[70, 10, 0]} intensity={0.3} penumbra={1} /> */}
            <spotLight position={[0, 10, 10]} intensity={0.3} penumbra={1} />
            <spotLight position={[-10, 10, 0]} intensity={0.3} penumbra={1} />
            <spotLight position={[-30, 10, 0]} intensity={0.3} penumbra={1} />
            {/* <pointLight position={[20, 25, 0]} intensity={0.9}/> */}
            <OrbitControls ref={view} enableZoom={true} enablePan={true} zoomSpeed={0.3} setPolarAngle={Math.PI / 3} />
            </Suspense>
        </Canvas>
    )
}

export default Canvas3D