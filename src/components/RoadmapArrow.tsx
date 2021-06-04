import React, {FunctionComponent} from 'react'

import './RoadmapArrow.sass';

import RoadmapArrowLogo from '../img/RoadmapArrowLogo.png';
import RoadmapArrowGraphic from '../img/RoadmapArrow.png';
import RoadmapArrowShadow from '../img/RoadmapArrowShadow.png';

import RoadmapContent from './RoadmapContent.json';

export const RoadmapArrow: FunctionComponent = () => {
  const targetPercentage = Math.round(100 * RoadmapContent.currentPrice / RoadmapContent.priceGoal) + '%'
  return <div className="RoadmapArrow">
    <img alt="" src={RoadmapArrowLogo} />
    <span className="RoadmapArrowPrice">{`$${RoadmapContent.currentPrice}`}</span>
    <div className="Seperator"/>
    <span className="TargetReached">
      <span className="TargetReachedPercentage">{targetPercentage}</span>
      Target Reached
    </span>

    <img alt="arrow" src={RoadmapArrowGraphic} className="RoadmapArrowGraphic" />
  </div>
}

export default RoadmapArrow;
