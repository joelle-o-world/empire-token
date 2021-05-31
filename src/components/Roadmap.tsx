import React, {FunctionComponent, useCallback, useMemo, useRef, useState} from 'react'

import './Roadmap.sass'
import DashSeperator from '../img/DashSeperator.svg'
import EmpireStateScroller from './EmpireStateScroller';

import RoadmapContent from './RoadmapContent.json'
const {milestones} = RoadmapContent


export const Roadmap: FunctionComponent<{scrollable?: boolean}> = ({scrollable=false}) => {
  console.log('re-rendering roadmap')
  const [scrollProgress, setScrollProgress] = useState(0)
  const handleScroll = useCallback(e => {
    setScrollProgress( 
      e.target.scrollTop / (e.target.scrollHeight-e.target.clientHeight)
    )
  }, [])


  const milestoneListRef = useRef(null as null|HTMLDivElement)
  const handleDragScroll = (y:number) => {
    let list = milestoneListRef.current
    if(list) {
      //list.scrollTop = y * (list.scrollHeight-list.clientHeight)
      list.scrollTo({left:0, top: y * (list.scrollHeight - list.clientHeight)})
    }
  }
  const MilestonesListItems = useMemo(() => {
    console.log('re formatting');
    return milestones.map(({date, title}, i) => (
      <Milestone date={new Date(date)} title={title} key={i} floorNumber={milestones.length-i} />
    )
  )} , [])


  //const lingerMin = 100
  //const [lingering, setLingering] = useState(false)
  //const lingerTimer = useRef(null as any);
  //const startLingerTimer = () => {
    //console.log('start linger')
    //let timeout = lingerTimer.current
    //if(!timeout)
      //lingerTimer.current = setTimeout(() => setLingering(true), lingerMin);
  //}
  //const cancelLingerTimer = () => {
    //console.log('cancelLinger')
    //setLingering(false)
    //let timeout = lingerTimer.current;
    //if(timeout)
      //clearTimeout(timeout);

    //lingerTimer.current = null
  //}

  //console.log('lingering:', lingering)

  return <div 
      className="Roadmap" 
    >
    <EmpireStateScroller scrollProgress={scrollProgress} onScroll={handleDragScroll}/>
    <div 
      className="MilestonesList" 
      onScroll={handleScroll} 
      style={{overflowY: scrollable ? 'auto' : 'hidden'}} 
      ref={milestoneListRef}
    >
      {MilestonesListItems}
    </div>
  </div>
}

export default Roadmap;

export interface MilestoneProps {
  date: Date;
  title: string;
  floorNumber: number;
}

const formatDate = (date: Date) => `${
  String(date.getDate()).padStart(2, '0')
}/${String(date.getMonth()+1).padStart(2,'0')
}/${String(date.getFullYear()%100).padStart(2,'0')}`

export const Milestone: FunctionComponent<MilestoneProps> = ({floorNumber, date, title}) => {
  return <div className="Milestone">
    <div className="MilestoneNumber">{floorNumber}</div>
    <img src={DashSeperator} className="DashSeperator" alt="-"/>
    {
      //<div className="SkyScaperWindows">
      //<div className="SkyScraperWindow"/>
      //<div className="SkyScraperWindow"/>
      //<div className="SkyScraperWindow"/>
      //</div>
    }
    <div className="MilestoneInfoBox">
      <h4 className="MilestoneDate">{formatDate(date)}</h4>
      <h3 className="MilestoneTitle">{title}</h3>
    </div>
  </div>
}


