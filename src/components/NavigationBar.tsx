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
  //const openMenu = () => setMenuOpen(true)
  const closeMenu = () => setMenuOpen(false)

  const [isStuck, setIsStuck] = useState(false)
  useEffect(() => {
    const checkIsStuck = () => {
      setIsStuck(window.scrollY > 20)
    }
    checkIsStuck();
    window.addEventListener('scroll', checkIsStuck)
    return () => window.removeEventListener('scroll', checkIsStuck)
  }, [setIsStuck])

  useEffect(() => {
    if(menuOpen) {
      window.addEventListener('scroll', closeMenu)
      return () => window.removeEventListener('scroll', closeMenu)
    }
  }, [menuOpen])

  const handleBuyNow = () => window.open("https://pancakeswap.finance", "blank")

  return <div className={classNames("NavigationBar", {isStuck})}>

    <img className="SiteLogo" src={SideTextLogo} alt="Empire Token" />

    {
      !menuOpen && <button className="OpenBurgerMenuButton" onClick={toggleMenu}><IoMdMenu/></button>
    }

    <div className={classNames(
      "NavigationBarMenu", 
      menuOpen ? "BurgerMenuOpen" : "BurgerMenuClosed"
    )}>
      <button className="CloseBurgerMenuButton" onClick={closeMenu}><IoMdClose/></button>
      <div className="TopRow">
        <nav className="SocialMedia">
          <SocialMediaIcon img={TwitterIcon} url="http://twitter.com" alt="Twitter" />
          <SocialMediaIcon img={RedditIcon} alt="Reddit" url="http://reddit.com" />
          <SocialMediaIcon img={InstagramIcon} alt="Instagram" url="http://instagram.com" />
          <SocialMediaIcon img={GithubIcon} alt="Github" url="https://github.com" />
          <SocialMediaIcon img={LinkedinIcon} alt="LinkedIn" url="http://linkedin.com" />
          <SocialMediaIcon img={YoutubeIcon} alt="YouTube" url="http://youtube.com" />
          <SocialMediaIcon img={TelegramIcon} alt="Telegram" url="http://telegram.org"/>
        </nav>
        <PurpleFancyButton onClick={handleBuyNow}>BUY EMPIRE NOW!</PurpleFancyButton>
      </div>
      <nav className="BottomRow SiteLinks">
        {
          <a href="/">Home</a>
        }
        <a href="link2">Audit</a>
        <a href="http://poocoin.com" target="blank">Price Chart</a>
        {
          //<a href="link4">Renounce Of Ownership</a>
        }
      </nav>
    </div>
  </div>
}

