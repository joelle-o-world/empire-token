import React from 'react';

import './home.sass';
import HowEmpireCanBeUsed from './components/HowEmpireCanBeUsed';
import Countdown from './components/Countdown';
import {NavigationBar} from './components/NavigationBar';
import TiltingLogo from './TiltingLogo';
import Roadmap from './components/Roadmap'
import ContactForm from './components/ContactForm';
import HeroBanner from './components/HeroBanner';
import SiteLinks from './components/SiteLinks';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <NavigationBar/>
      <div className="HeroBannerWrapper">
      {
        <HeroBanner/>
      }
      </div>

      <div className="HowEmpireCanBeUsedWrapper">
        <HowEmpireCanBeUsed/>
      </div>


      <div className="CountdownWrapper">
        <h2>Time until Presale</h2>
        <Countdown />
      </div>

      <div className="TiltingLogoWrapper TiltingLogoWrapper1">
      {
        <TiltingLogo/> 
      }
      </div>

      <div className="RoadmapWrapper">
        <Roadmap/>
      </div>

      <div className="TiltingLogoWrapper TiltingLogoWrapper2">
      {
        <TiltingLogo/> 
      }
      </div>

      <div className="FooterWrapper">
        <Footer/>
      </div>

    </>
  );
}

export default App;
