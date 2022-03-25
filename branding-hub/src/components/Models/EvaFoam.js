import React, { useRef, useState, useMemo, useEffect } from "react"
import * as THREE from "three"
import five from "../../builtModels/Red/DW304_DW304_Eva_foam_mat_BaseColor.png"

const EvaFoam = (props) => {
    const mesh = useRef()

    const [active, setActive] = useState(false)
    // const [hovered, setHover] = useState(false)
    const [zoom, setZoom] = useState(1)

    const handleZoom = (e) => {
        if (e.wheelDeltaY < 0) {
            setZoom(zoom - 0.05)
        } else {
            setZoom(zoom + 0.05)
        }
    }

    const texture = useMemo(() => new THREE.TextureLoader().load(five), [])

    useEffect(() => {
        mesh.current.rotation.x = Math.PI / 2;
    }, [])

    return (
        <mesh
        {...props}
        ref={mesh}
        scale={[zoom, zoom, zoom]}
        onClick={(e) => setActive(!active)}
            >
            <circleBufferGeometry args={[0.55, 380]} />
            <meshPhongMaterial attach="material" transparent side={THREE.DoubleSide}>
                <primitive attach="map" object={texture} />
            </meshPhongMaterial>
        </mesh>
    )
}

export default EvaFoam