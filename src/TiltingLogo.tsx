import React, {FunctionComponent, Suspense, useRef} from 'react';
import {Canvas, useLoader} from '@react-three/fiber'

import {useRelativeMousePosition} from './hooks/useMousePosition'

import Logo from './components/3dLogo'

export const TiltingLogo: FunctionComponent = () => {
  const ref = useRef(null)
  const {mouseX, mouseY} = useRelativeMousePosition(ref)
  return <div className="TiltingLogoWrapper" ref={ref}>
    <Suspense fallback="something went wrong">
      <Canvas >
        <ambientLight intensity={0.1}/>
        <directionalLight intensity={0.5} />
        <Logo rotation={[mouseY/2500, mouseX/2500, 0]}/>
      </Canvas>
    </Suspense>
  </div>
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
