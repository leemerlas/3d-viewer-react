import { Canvas, useThree, useLoader } from "@react-three/fiber"
import React, { useRef, useEffect, Suspense } from "react"
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Environment, OrbitControls } from "@react-three/drei";
import * as THREE from "three"

import EvaFoam from "./EvaFoam";
import Bottle from "./Bottle";
import Logo from "./Logo"


const Canvas3D = (props) => {
    let positionArgs = props.positionArgs

    // if (props.positionArgs[1] >= -1.25 && props.positionArgs[1] <= 0.25) {
    //     positionArgs = props.positionArgs
    // }

    // useEffect(() => {
    //     positionArgs[1] = (positionArgs[1] + posY)
    // })

    return (
        <Canvas style={{ backgroundColor: "white", height: "92.5vh" }}>
            <Suspense fallback={null}>
            <Bottle />
            <EvaFoam position={[0, -1.26, 0]}/>
            <Logo image={props.image} deltaPosition={props.deltaPosition} position={positionArgs} rotationArgs={props.rotationArgs}/>
            <OrbitControls />
            {/* <Environment preset="sunset" background /> */}
            {/* <CameraController /> */}
            <ambientLight intensity={0.175} />
            <spotLight position={[5, 5, 10]} intensity={0.2} penumbra={1} />
            {/* <pointLight position={[-10, -20, -30]} /> */}
            </Suspense>
        </Canvas>
    )
}

export default Canvas3D