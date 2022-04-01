import React, { useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import logoTexture from "../../assets/tesla-logo-nobg.png"

const Logo = (props) => {
    const mesh = useRef()

    const texture = useMemo(() => new THREE.TextureLoader().load(logoTexture), [])
    texture.repeat = new THREE.Vector2(4,1)
    texture.center = new THREE.Vector2(0.5,0.5)

    useEffect(() => {
        mesh.current.rotation.y = Math.PI ;
        // mesh.current.rotation.x = Math.PI / 2 ;
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