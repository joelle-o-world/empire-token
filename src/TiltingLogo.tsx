import React, {FunctionComponent, Suspense, useEffect, useRef} from 'react';
import {Canvas, useFrame} from '@react-three/fiber'


import Logo from './components/Logo2'


const quarterPI = Math.PI / 4

export const TiltingLogo: FunctionComponent = () => {
  const divRef = useRef(null as null|HTMLDivElement)
  const modelRef = useRef(null as any)
  useEffect(() => {
    const handleScroll = () => {
      let model = modelRef.current
      const div = divRef.current
      if(model && div) {
        let {top, bottom} = div.getBoundingClientRect()
        let progress = (top+bottom)/2 / window.innerHeight - .5
        model.rotation.x = progress * 2
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })

  return <div className="TiltingLogo" ref={divRef}>
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
        <SideToSideTilt>
          <group ref={modelRef}>
            <Logo/>
          </group>
        </SideToSideTilt>
      </Canvas>
    </Suspense>
  </div>
}

export default TiltingLogo;


let model
export const SideToSideTilt: FunctionComponent = ({children}) => {
  const ref = useRef(null as any)
  useFrame((state) => {
    model = ref.current
    if(model)
      model.rotation.y = quarterPI * Math.sin(Date.now() / 2000)
  });
  return <group ref={ref}>
    {children}
  </group>
}


//export const LogoModel:FunctionComponent = () => {
  ////const obj = useLoader(OBJLoader, "/models/3dLogo.obj")
  //const obj = useLoader(GLTFLoader, "/models/3dLogo.glb")
  //// @ts-ignore
  ////obj.children[0].geometry.drawRange.count = 582
  //return <group scale={0.4}>
    //<primitive object={obj} material="" position={[-33.5, 19, 0]}/>
  //</group>
//}
