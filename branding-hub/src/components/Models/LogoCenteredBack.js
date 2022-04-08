import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const LogoCenteredBack = (props) => {
    const mesh = useRef()
    const texture = new THREE.ImageUtils.loadTexture(props.image)
    texture.center = new THREE.Vector2(0.5,0.5)

    useEffect(() => {
        // mesh.current.rotation.y =  - Math.PI / 2;
        // mesh.current.rotation.z =  -Math.PI / 2;
    }, [])

    return (
        <mesh 
        {...props}
        ref={mesh}
        >
            <cylinderBufferGeometry attach="geometry" args={[0.965, 0.965, 2.25, 250, 250, true, -4.15, 2]} />
            <meshPhongMaterial attach="material" transparent side={THREE.FrontSide} polygonOffsetUnits={5}>
                <primitive attach="map" object={texture}  />
            </meshPhongMaterial>
        </mesh>
     );
}

export default LogoCenteredBack