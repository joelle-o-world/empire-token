import React, {FunctionComponent, useCallback, useMemo, useRef, useState, useEffect} from 'react'

import './Roadmap.sass'
import DashSeperator from '../img/DashSeperator.svg'
import EmpireStateScroller from './EmpireStateScroller';

import RoadmapContent from './RoadmapContent.json'
const milestones = RoadmapContent.milestones.reverse()


export const Roadmap: FunctionComponent<{scrollable?: boolean}> = ({scrollable=false}) => {
  const [scrollProgress, setScrollProgress] = useState(1)
  const handleScroll = useCallback((e:React.WheelEvent<HTMLDivElement>) => {
    const div = milestoneListRef.current
    if(div) {
      let newProgress = div.scrollTop / (div.scrollHeight-div.clientHeight)
      //let delta = scrollProgress - newProgress
      setScrollProgress( newProgress)
      //if(Math.abs(delta) > .001) {
        //let {top} = div.getBoundingClientRect()
        //if(top > 210 || top < 190 && lingering)
          //window.scrollTo({
            //top: window.scrollY + top - 200,
            //behavior: 'smooth'
          //})
      //}
    }
  }, [])


  const milestoneListRef = useRef(null as null|HTMLDivElement)
  const handleDragScroll = (y:number) => {
    let list = milestoneListRef.current
    if(list) {
      //list.scrollTop = y * (list.scrollHeight-list.clientHeight)
      list.scrollTo({left:0, top: y * (list.scrollHeight - list.clientHeight)})
    }
  }

  useEffect(() => { handleDragScroll(1) }, [])

  const MilestonesListItems = useMemo(() => {
    return milestones.map(({date, title}, i) => (
      <Milestone date={date} title={title} key={i} floorNumber={milestones.length-i} />
    )
  )} , [])


  const [lingering, setLingering] = useState(false)
  useEffect(() => {
    let lastTime = false
    const checkScroll = () => {
      let div = milestoneListRef.current
      if(div) {
        let {top, bottom} = div.getBoundingClientRect()
        if(top < window.innerHeight/2 && bottom > window.innerHeight/2) {
          if(lastTime) {
            setLingering(true)
          }
          lastTime = true
        } else {
          if(lastTime)
            setLingering(false)
          lastTime = false
        }
      }


    }
    let interval = setInterval(checkScroll, 1000)
    return () => clearInterval(interval)
  }, [])

  return <div 
      className="Roadmap" 
    >
    <EmpireStateScroller scrollProgress={scrollProgress} onScroll={handleDragScroll}/>
    <div 
      className="MilestonesList" 
      onScroll={handleScroll} 
      style={{overflowY: lingering ? 'auto' : 'hidden'}} 
      ref={milestoneListRef}
    >
      {MilestonesListItems}
    </div>
  </div>
}

export default Roadmap;

export interface MilestoneProps {
  date: string|null;
  title: string;
  floorNumber: number;
}

const formatDate = (date: Date) => `${
  String(date.getDate()).padStart(2, '0')
}/${String(date.getMonth()+1).padStart(2,'0')
}/${String(date.getFullYear()%100).padStart(2,'0')}`

export const Milestone: FunctionComponent<MilestoneProps> = ({floorNumber, date, title}) => {
  let formattedDate = typeof date === 'string' ? formatDate(new Date(date)) : '--'
  return <div className="Milestone">
    <div className="MilestoneNumber">{floorNumber + ' - '}</div>
    <img src={DashSeperator} className="DashSeperator" alt="-"/>
    {
      //<div className="SkyScaperWindows">
      //<div className="SkyScraperWindow"/>
      //<div className="SkyScraperWindow"/>
      //<div className="SkyScraperWindow"/>
      //</div>
    }
    <div className="MilestoneInfoBox">
      <h4 className="MilestoneDate">{formattedDate}</h4>
      <h3 className="MilestoneTitle">{title}</h3>
    </div>
  </div>
}


