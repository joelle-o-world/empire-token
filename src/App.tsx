import React from 'react';

import './home.sass';
import HowEmpireCanBeUsed from './components/HowEmpireCanBeUsed';
import Countdown from './components/Countdown';
import {SoundWaves} from './components/SoundWaves';

function App() {
  return (
    <>
      <div className="HeroSoundWavesWrapper">
        <SoundWaves/>
      </div>

      <div className="HowEmpireCanBeUsedWrapper">
        <HowEmpireCanBeUsed/>
      </div>

      <div className="CountdownWrapper">
        <Countdown />
      </div>
    </>
  );
}

export default App;
