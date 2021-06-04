import React, {FunctionComponent} from 'react'

import './Footer.sass'

import ContactForm from './ContactForm';
import SiteLinks from './SiteLinks';

export const Footer: FunctionComponent = () => {
  return <footer className="Footer">
  <div className="Elements">
    <ContactForm/>
    <SiteLinks/>
    </div>
    <small>© Empire Token 2021</small>
  </footer>
}

export default Footer
