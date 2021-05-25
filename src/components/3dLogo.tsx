/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

type GLTFResult = GLTF & {
  nodes: {
    polySurface1: THREE.Mesh
  }
  materials: {
    initialShadingGroup: THREE.MeshStandardMaterial
  }
}

const materialToUse = new THREE.MeshPhongMaterial()

export default function Model(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>()
  const { nodes, materials } = useGLTF('models/3dLogo.glb') as GLTFResult
  return (
    <group ref={group} {...props} dispose={null} scale={0.35}>
      <mesh geometry={nodes.polySurface1.geometry} material={materialToUse} position={[-33.25, 18.75, 0]}/>
    </group>
  )
}

useGLTF.preload('models/3dLogo.glb')
