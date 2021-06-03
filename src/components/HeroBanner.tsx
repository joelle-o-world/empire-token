import React, {FunctionComponent} from 'react';

import HeroBannerForeground from '../img/HeroBanner.png';
import './HeroBanner.sass'
import {SoundWaves} from './SoundWaves';
import ExplainerVideo from './ExplainerVideo'

import KeepClimbingHeader from '../img/KeepClimbingHeader.png';
import {ClipboardButton} from './ClipboardButton';

const openBSCScan = () => window.open("http://bscscan.com", "_blank")
const openPriceChart = () => window.open("http://poocoin.com", "_blank")

export const HeroBanner: FunctionComponent = () => {
  return <div className="HeroBanner">
    <SoundWaves/>
    <img src={HeroBannerForeground} className="HeroBannerForeground" alt="CGI empire state building"/>
    {
      <ExplainerVideo/>
    }
    <div className="HeroText">
      <h1><img src={KeepClimbingHeader} alt="Keep Climbing"/></h1>
        <p> Built as a super token, Empire brings the world of non-fungible tokens (NFTs) to a different level.  
       We will include all-in-one, that’s why we will like to call it a super token! NFTs is a hot topic so we decided to start with a real life solution for NFTs as our first use case.  </p>
        <p> Our NFT marketplace will give our users the platform to trade, stake and license NFTs for commercial use.  
         We are here to bring a whole new dimension to the world of crypto by bringing it to real life applications and use cases.  </p>
        <div className="ButtonGroup">
        <button onClick={openBSCScan}>BSCSCAN</button>
        <button onClick={() => window.open("whitepaper.pdf", "blank")}>WHITE PAPER</button>
      </div>

      <p className="Statistics"> Token name: Empire Token<br/> 
      Symbol: Empire <br/>
      Decimal: 18 <br/>
      <strong>Supply:</strong> 1,000,000,000,000,000</p>

      <div className="TokenAddress">
        <h3>TOKEN ADDRESS:</h3>
        <ClipboardButton toCopy="0xe9aa9c5ee1b82fc15eCaF0487DB26DBb205bDe6e" name="0xe9aa9c5ee1b82fc15eCaF0487DB26DBb205bDe6e"/>
      </div>
    </div>
  </div>
}

export default HeroBanner
