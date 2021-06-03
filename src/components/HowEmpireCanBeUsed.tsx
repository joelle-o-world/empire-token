import React, {FunctionComponent} from 'react';
import CardCarousel, {Card} from './CardCarousel';

import EventsIcon from '../img/EventsIcon.png';

import NFTsIcon from '../img/NftIcon.png';
import PodcastIcon from '../img/PodcastIcon.png';
import Ucn1 from '../img/UCN_001.svg'
import Ucn2 from '../img/UCN_002.svg'

export const HowEmpireCanBeUsed: FunctionComponent = () => {
  return <CardCarousel>
    <Card>
      <img src={Ucn1} alt="" className="CardLogo" />
      <h2>Ticket Bookings</h2>
      <p>coming soon...</p>
    </Card>
    <Card>
      <img src={EventsIcon} alt="" className="CardLogo" />
      <h2>Events</h2>
      <p>coming soon...</p>
    </Card>
    <Card>
      <img src={NFTsIcon} alt=""  className="CardLogo" />
      <h2>NFTs</h2>
      <p>Unique real life solution for the NFT world. Make use of your arts by earning money by licensing them for commercial use. NFTs ownership will represents the legal ownership of the content whatever it is.</p>
    </Card>
    <Card>
      <img src={PodcastIcon} alt="" className="CardLogo" />
      <h2>Podcast</h2>
      <p>coming soon...</p>
    </Card>
    <Card>
      <img src={Ucn2} alt="" className="CardLogo" />
      <h2>2-1 Deals</h2>
      <p>coming soon...</p>
    </Card>
  </CardCarousel>
}

export default HowEmpireCanBeUsed;
