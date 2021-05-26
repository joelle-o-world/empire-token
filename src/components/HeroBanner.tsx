import React, {FunctionComponent} from 'react';

import HeroBannerForeground from '../img/HeroBanner.png';
import './HeroBanner.sass'
import {SoundWaves} from './SoundWaves';

import KeepClimbingHeader from '../img/KeepClimbingHeader.png';

export const HeroBanner: FunctionComponent = () => {
  return <div className="HeroBanner">
    <SoundWaves/>
    <img src={HeroBannerForeground} className="HeroBannerForeground"/>
    <div className="HeroText">
    <h1><img src={KeepClimbingHeader}/></h1>
      <p>While everyone is going to the moon. We are inviting the astronauts into our world, we will take them to a very memorable journey, taking the stairs up the empire state building. <a className="ReadMoreLink">Read More</a></p>
      <div className="ButtonGroup">
        <button>BSCSCAN</button>
        <button>PRICE CHART</button>
      </div>
      <p><strong>Supply:</strong> 1,000,000,000,000,000</p>

      <div className="TokenAddress">
        <h3>TOKEN ADDRESS:</h3>
        
      </div>
    </div>
  </div>
}

export default HeroBanner
