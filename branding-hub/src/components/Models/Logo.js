import React, { useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import logoTexture from "../../assets/tesla-logo-nobg.png"

const Logo = (props) => {
    const mesh = useRef()

    // let deltaPosition = props.deltaPosition
    // console.log(deltaPosition);

    // let posY;

    // if (deltaPosition.y > 0) {
    //     posY = 0.2
    // } else {
    //     posY = -0.2
    // }

    let rotation = props.rotationArgs

    const texture = new THREE.ImageUtils.loadTexture(props.image)
    texture.repeat = new THREE.Vector2(4,1)
    texture.center = new THREE.Vector2(0.5,0.5)

    useEffect(() => {
        // mesh.current.position.y += posY
        mesh.current.rotation.y = rotation ;
    }, [])

    return (
        <mesh 
        {...props}
        ref={mesh}
        >
           <cylinderBufferGeometry attach="geometry" args={[1.325, 1.325, 2.275, 380]} />
           {/* <planeBufferGeometry attach="geometry" args={[10, 10, 2, 2]}/> */}
           <meshPhongMaterial attach="material" transparent side={THREE.FrontSide} polygonOffsetUnits={5}>
                <primitive attach="map" object={texture} scale={0.35} />
           </meshPhongMaterial>
        </mesh>
     );
}

export default Logo