import React, {FunctionComponent} from 'react'
import PurpleFancyButton from './PurpleFancyButton'

import './ContactForm.sass'

export const ContactForm: FunctionComponent = () => {
  return <div className="ContactForm">
    <input className="NameInput" placeholder="Your Name" />
    <input className="EmailInput" type="email" placeholder="Your Email Address" />
    <textarea placeholder="Message" className="MessageInput" />
    <small>
      <a href="Terms link">Terms</a> | <a href="Conditions link">Conditions</a>
    </small>
    <PurpleFancyButton>SUBMIT</PurpleFancyButton>
  </div>
}

export default ContactForm
