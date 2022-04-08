import React, { useRef, useState, useMemo } from "react"
import * as THREE from "three"
import { Canvas, useThree, useLoader } from "@react-three/fiber"
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import Stats from 'three/examples/jsm/libs/stats.module'
import { useGLTF } from '@react-three/drei'

const Bottle = () => {
    // const { nodes, materials } = useGLTF('/DW304.glb')
    // const gltf = useLoader(GLTFLoader, 'DW304.glb')
    const fbx = useLoader(FBXLoader, '/DW305.fbx')

    const bodyTexture = useLoader(TextureLoader, 'DW305_mat_BaseColor.png')
    const evaFoamTexture = useLoader(TextureLoader, 'DW305_Eva_foam_mat_BaseColor.png')
    const normalEvaFoamTexture = useLoader(TextureLoader, 'Eva_foam_mat_normal.png')
    evaFoamTexture.mapping = THREE.EquirectangularReflectionMapping
    const capTexture = useLoader(TextureLoader, 'DW305_cap_mat_BaseColor.png')
    const metalCapTexture = useLoader(TextureLoader, 'DW305_cap_mat_Metallic.png')
    const normalCapTexture = useLoader(TextureLoader, 'DW305_cap_mat_Normal.png')
    const roughnessCapTexture = useLoader(TextureLoader, 'DW305_cap_mat_Roughness.png')
    const siliconTexture = useLoader(TextureLoader, 'DW305_Silicon_mat_BaseColor.png')

    function reloadLogo () {
        
    }

    fbx.children.forEach((mesh, i) => {
        if (mesh.name.includes("Eva_Foam")) {
            mesh.material = new THREE.MeshStandardMaterial({ map: evaFoamTexture });
        } else if (mesh.name.includes("bottle")) {
            mesh.children.forEach((mat, i) => {
                mat.material = new THREE.MeshStandardMaterial({ map: bodyTexture });
            })
        } else if (mesh.name.includes("Silicon")) {
            mesh.children.forEach((mat, i) => {
                mat.material = new THREE.MeshStandardMaterial({ map: siliconTexture });
            })
        } else {
            mesh.children.forEach((mat, i) => {
                mat.material = new THREE.MeshStandardMaterial({ map: capTexture, metalnessMap: metalCapTexture, metalness: 1, normalMap: normalCapTexture, roughnessMap: roughnessCapTexture });
            })
        }

    });


    return <primitive object={fbx} scale={0.255} position={[0, -3.05, 0]}/>
}

export default Bottle