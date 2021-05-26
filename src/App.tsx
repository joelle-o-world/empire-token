import React from 'react';

import './home.sass';
import HowEmpireCanBeUsed from './components/HowEmpireCanBeUsed';
import Countdown from './components/Countdown';
import {SoundWaves} from './components/SoundWaves';
import {NavigationBar} from './components/NavigationBar';
import TiltingLogo from './TiltingLogo';
import Roadmap from './components/Roadmap'

function App() {
  return (
    <>
      <NavigationBar/>
      <div className="HeroSoundWavesWrapper">
      {
        <SoundWaves/>
      }
      </div>

      <div className="HowEmpireCanBeUsedWrapper">
        <HowEmpireCanBeUsed/>
      </div>


      <div className="CountdownWrapper">
        <Countdown />
      </div>

      <div className="TiltingLogoWrapper TiltingLogoWrapper1">
        <TiltingLogo/> 
      </div>

      <div className="RoadmapWrapper">
        <Roadmap/>
      </div>

      <div className="TiltingLogoWrapper TiltingLogoWrapper2">
        <TiltingLogo/> 
      </div>
    </>
  );
}

export default App;
