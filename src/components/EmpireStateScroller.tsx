import React, {FunctionComponent, useRef, useState} from 'react'

import './EmpireStateScroller.sass'

import EmpireStateFlatMesh from '../img/EmpireStateFlatMesh.svg';
import SmallLogo from '../img/SmallLogo.svg'

interface EmpireStateScrollerProps {
  scrollProgress: number;
  onScroll?: (newProgress: number) => void;
}

export const EmpireStateScroller: FunctionComponent<EmpireStateScrollerProps> = ({scrollProgress, onScroll}) => {
  const divRef = useRef(null as null|HTMLDivElement)
  let height = divRef.current ? divRef.current.clientHeight : 800
  let top = (height-59) * scrollProgress

  let [dragAnchor, setDragAnchor] = useState(30)
  const handleMouseDown = (e:React.MouseEvent<HTMLButtonElement>) => {
    let rect = (e.target as HTMLButtonElement).getBoundingClientRect()
    let yAnchor = e.clientY - rect.top
    setDragAnchor(yAnchor)
  }
  const handleMouseMove = (e:React.MouseEvent) => {
    let div = divRef.current
    if(e.buttons === 1 && div) {
      let newTop = e.clientY - dragAnchor - div.getBoundingClientRect().top
      let newProgress = Math.max(0, Math.min(1, newTop / (height - 59)))
      if(onScroll)
        onScroll(newProgress)
    }
  }

  return <div className="EmpireStateScroller" ref={divRef} >
    <img src={EmpireStateFlatMesh} alt="CGI Empire State Building" className="ScrollerBackground"onMouseMove={handleMouseMove} onMouseDown={handleMouseMove}/>
    <button 
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      className="DragHandle"
      style={{top: top+'px'}}
    ><img src={SmallLogo} alt="" /> YOU ARE HERE</button>
  </div>
}
export default EmpireStateScroller
