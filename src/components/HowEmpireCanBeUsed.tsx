import React, {FunctionComponent} from 'react';
import CardCarousel, {Card} from './CardCarousel';

import EventsIcon from '../img/EventsIcon.png';

import NFTsIcon from '../img/NftIcon.png';
import PodcastIcon from '../img/PodcastIcon.png';

export const HowEmpireCanBeUsed: FunctionComponent = () => {
  return <CardCarousel>
    <Card>
      <img src={EventsIcon} alt="" />
      <h2>Events</h2>
      <p>you will be able to use your $Empire token to buy into musical related events. We will aim to have our exclusive artists and therefore our exclusive events.</p>
    </Card>
    <Card>
      <img src={NFTsIcon} alt="" />
      <h2>NFTs</h2>
      <p>We will reach out to partner with and collaborate with recognized names in the NFT space. We will be a niche marketplace. Our vision is to be a music related NFT marketplace but we will leave this to the community to vote on. </p>
    </Card>
    <Card>
      <img src={PodcastIcon} alt="" />
      <h2>Podcast</h2>
      <p>Launch of our podcast app where users can tip podcasters using the Empire token. It would be good to add some more text here so it balances out with the other text boxes. That would be great. </p>
    </Card>
  </CardCarousel>
}

export default HowEmpireCanBeUsed;
