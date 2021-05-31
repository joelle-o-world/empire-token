import React, {FunctionComponent, useEffect, useState} from 'react'
import classNames from 'classnames';

import './NavigationBar.sass';
import {IoMdClose, IoMdMenu} from 'react-icons/io'

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
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleMenu = () => setMenuOpen(val => !val)
  const openMenu = () => setMenuOpen(true)
  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    if(menuOpen) {
      window.addEventListener('scroll', closeMenu)
      return () => window.removeEventListener('scroll', closeMenu)
    }
  }, [menuOpen])

  return <div className="NavigationBar">

    <img className="SiteLogo" src={SideTextLogo} alt="Empire Token" />

    <button className="OpenBurgerMenuButton" onClick={toggleMenu}><IoMdMenu/></button>

    <div className={classNames(
      "NavigationBarMenu", 
      menuOpen ? "BurgerMenuOpen" : "BurgerMenuClosed"
    )}>
      <button className="CloseBurgerMenuButton" onClick={closeMenu}><IoMdClose/></button>
      <div className="TopRow">
        <nav className="SocialMedia">
          <SocialMediaIcon img={TwitterIcon} alt="Twitter" />
          <SocialMediaIcon img={RedditIcon} alt="Reddit" />
          <SocialMediaIcon img={InstagramIcon} alt="Instagram" />
          <SocialMediaIcon img={GithubIcon} alt="Github" />
          <SocialMediaIcon img={LinkedinIcon} alt="LinkedIn" />
          <SocialMediaIcon img={YoutubeIcon} alt="YouTube" />
          <SocialMediaIcon img={TelegramIcon} alt="Telegram" />
        </nav>
        <PurpleFancyButton>BUY EMPIRE NOW!</PurpleFancyButton>
      </div>
      <nav className="BottomRow SiteLinks">
        <a href="link1">Home</a>
        <a href="link2">Audit</a>
        <a href="link3">Price Chart</a>
        <a href="link4">Renounce Of Ownership</a>
      </nav>
    </div>
  </div>
}

