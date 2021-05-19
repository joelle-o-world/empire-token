import React from 'react';

import './home.sass';
import HowEmpireCanBeUsed from './components/HowEmpireCanBeUsed';
import Countdown from './components/Countdown';

function App() {
  return (
    <>
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
