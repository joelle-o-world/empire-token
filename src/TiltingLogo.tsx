import React, {FunctionComponent, Suspense} from 'react';
import {Canvas, useLoader} from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
//import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
//import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';

import Logo from './components/3dLogo'

export const TiltingLogo: FunctionComponent = () => {
  return <Suspense fallback="something went wrong">
    <Canvas>
      <ambientLight intensity={0.1}/>
      <directionalLight intensity={0.5} />
      <Logo/>
    </Canvas>
  </Suspense>
}

export default TiltingLogo;

//export const LogoModel:FunctionComponent = () => {
  ////const obj = useLoader(OBJLoader, "/models/3dLogo.obj")
  //const obj = useLoader(GLTFLoader, "/models/3dLogo.glb")
  //// @ts-ignore
  ////obj.children[0].geometry.drawRange.count = 582
  //return <group scale={0.4}>
    //<primitive object={obj} material="" position={[-33.5, 19, 0]}/>
  //</group>
//}
