import React, {FunctionComponent, Suspense, useRef} from 'react';
import {Canvas, useLoader} from '@react-three/fiber'

import {useRelativeMousePosition} from './hooks/useMousePosition'

import Logo from './components/Logo2'

export const TiltingLogo: FunctionComponent = () => {
  const ref = useRef(null)
  const {mouseX, mouseY} = useRelativeMousePosition(ref)

  return <div className="TiltingLogo" ref={ref}>
    <Suspense fallback="something went wrong">
      <Canvas >
        <spotLight 
          intensity={.5}  
          color="rgb(81,248,248)"
          position={[2, 2, 2]}
        />
        <spotLight
          intensity={.5}
          position={[-2, -2, 2]}
          color="rgb(144,144,246)"
        />
        <Logo rotation={[
          mouseY/window.innerHeight, 
          -mouseX/window.innerWidth * .4, 
          0
        ]}/>
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
