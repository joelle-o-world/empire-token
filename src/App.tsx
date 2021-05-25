import React from 'react';

import './home.sass';
import HowEmpireCanBeUsed from './components/HowEmpireCanBeUsed';
import Countdown from './components/Countdown';
import {SoundWaves} from './components/SoundWaves';
import {NavigationBar} from './components/NavigationBar';
import TiltingLogo from './TiltingLogo';

function App() {
  return (
    <>
      <NavigationBar/>
      <div className="HeroSoundWavesWrapper">
      {
        //<SoundWaves/>
      }
      </div>

      <div className="HowEmpireCanBeUsedWrapper">
        <HowEmpireCanBeUsed/>
      </div>


      <div className="CountdownWrapper">
        <Countdown />
      </div>

      {
        <TiltingLogo/>
      }
    </>
  );
}

export default App;
