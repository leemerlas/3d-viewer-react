import React, { useRef, useState, useMemo } from "react"
import * as THREE from "three"
import { Canvas, useThree, useLoader } from "@react-three/fiber"
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import Stats from 'three/examples/jsm/libs/stats.module'
import { useGLTF } from '@react-three/drei'

const Bottle = () => {
    const { nodes, materials } = useGLTF('/DW304.glb')
    // const gltf = useLoader(GLTFLoader, 'DW304.glb')
    const fbx = useLoader(FBXLoader, '/DW304.fbx')

    const bodyTexture = useLoader(TextureLoader, 'red_mat_BaseColor.png')
    const evaFoamTexture = useLoader(TextureLoader, 'red_Eva_foam_mat_BaseColor.png')
    const normalEvaFoamTexture = useLoader(TextureLoader, 'Eva_foam_mat_normal.png')
    evaFoamTexture.mapping = THREE.EquirectangularReflectionMapping
    const capTexture = useLoader(TextureLoader, 'red_cap_mat_BaseColor.png')
    const siliconTexture = useLoader(TextureLoader, 'red_Silicon_mat_BaseColor.png')

    function reloadLogo () {
        
    }

    fbx.children.forEach((mesh, i) => {
        if (mesh.name.includes("Eva_Foam")) {
            mesh.material = new THREE.MeshPhongMaterial({ map: evaFoamTexture });
        } else if (mesh.name.includes("bottle")) {
            mesh.children.forEach((mat, i) => {
                mat.material = new THREE.MeshPhongMaterial({ map: bodyTexture });
            })
        } else if (mesh.name.includes("Silicon")) {
            mesh.children.forEach((mat, i) => {
                mat.material = new THREE.MeshPhongMaterial({ map: siliconTexture });
            })
        } else {
            mesh.children.forEach((mat, i) => {
                mat.material = new THREE.MeshPhongMaterial({ map: capTexture });
            })
        }

    });


    return <primitive object={fbx} scale={0.35} position={[0, -2.75, 0]}/>
}

export default Bottle