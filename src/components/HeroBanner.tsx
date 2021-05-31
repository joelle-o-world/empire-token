import React, {FunctionComponent} from 'react';

import HeroBannerForeground from '../img/HeroBanner.png';
import './HeroBanner.sass'
//import {SoundWaves} from './SoundWaves';
//import ExplainerVideo from './ExplainerVideo'

import KeepClimbingHeader from '../img/KeepClimbingHeader.png';
import {ClipboardButton} from './ClipboardButton';

export const HeroBanner: FunctionComponent = () => {
  return <div className="HeroBanner">
  {
    //<SoundWaves/>
  }
    <img src={HeroBannerForeground} className="HeroBannerForeground" alt="CGI empire state building"/>
    {
      //<ExplainerVideo/>
    }
    <div className="HeroText">
    <h1><img src={KeepClimbingHeader} alt="Keep Climbing"/></h1>
      <p>While everyone is going to the moon. We are inviting the astronauts into our world, we will take them to a very memorable journey, taking the stairs up the empire state building. <a href="read more link" className="ReadMoreLink">Read More</a></p>
      <div className="ButtonGroup">
        <button>BSCSCAN</button>
        <button>PRICE CHART</button>
      </div>
      <p><strong>Supply:</strong> 1,000,000,000,000,000</p>

      <div className="TokenAddress">
        <h3>TOKEN ADDRESS:</h3>
        <ClipboardButton toCopy="0xe9aa9c5ee1b82fc15eCaF0487DB26DBb205bDe6e" name="0xe9aa9c5ee1b82fc15eCaF0487DB26DBb205bDe6e"/>
      </div>
    </div>
  </div>
}

export default HeroBanner
