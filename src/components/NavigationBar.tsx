import React, {FunctionComponent} from 'react'

import './NavigationBar.sass';

import {SocialMediaIcon} from './SocialMediaIcon';
import PurpleFancyButton from './PurpleFancyButton';

import SideTextLogo from '../img/SideTextLogo.svg'
import TwitterIcon from '../img/Twitter.svg';
import RedditIcon from '../img/Reddit.svg';
import InstagramIcon from '../img/Instagram.svg';
import GithubIcon from '../img/Github.svg';
import LinkedinIcon from '../img/Linkedin.svg';
import YoutubeIcon from '../img/Youtube.svg';
import TelegramIcon from '../img/Telegram.svg';

export const NavigationBar: FunctionComponent = () => {
  return <div className="NavigationBar">
    <img className="SiteLogo" src={SideTextLogo} />
    <div className="NavigationBarMenu">
      <div className="TopRow">
        <nav className="SocialMedia">
          <SocialMediaIcon img={TwitterIcon} />
          <SocialMediaIcon img={RedditIcon} />
          <SocialMediaIcon img={InstagramIcon} />
          <SocialMediaIcon img={GithubIcon} />
          <SocialMediaIcon img={LinkedinIcon} />
          <SocialMediaIcon img={YoutubeIcon} />
          <SocialMediaIcon img={TelegramIcon} />
        </nav>
        <PurpleFancyButton>BUY EMPIRE NOW!</PurpleFancyButton>
      </div>
      <nav className="BottomRow SiteLinks">
        <a>Home</a>
        <a>Audit</a>
        <a>Price Chart</a>
        <a>Renounce Of Ownership</a>
      </nav>
    </div>
  </div>
}

