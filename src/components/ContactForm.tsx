import React, {FunctionComponent, useState} from 'react'
import PurpleFancyButton from './PurpleFancyButton'

import './ContactForm.sass'

export const ContactForm: FunctionComponent = () => {
  const [formFields, setFormFields] = useState({
    name: '',
    email: '',
    message: ''
  })
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    setFormFields((old: typeof formFields) => ({
      ...old,
      [e.target.name]: e.target.value
    }))
  }

  console.log(formFields)
  const handleSubmit = () => {
    const url = `/api/contact.php?name=${
      encodeURIComponent(formFields.name)
    }&email=${
      encodeURIComponent(formFields.email)
    }&message=${
      encodeURIComponent(formFields.message)
    }`
    const request = new XMLHttpRequest()
    request.open('get',url)
    request.send()
    request.onload = () => console.log("Message sent!")

    setFormFields({name: '', email:'', message:''})
  }

  return <div className="ContactForm">
    <input className="NameInput" placeholder="Your Name" onChange={handleChange} name="name" value={formFields.name} />
    <input className="EmailInput" type="email" placeholder="Your Email Address" onChange={handleChange} name="email" value={formFields.email} />
    <textarea placeholder="Message" className="MessageInput" onChange={handleChange} name="message" value={formFields.message} />
    <small>
      <a href="Terms link">Terms</a> | <a href="Conditions link">Conditions</a>
    </small>
    <PurpleFancyButton onClick={handleSubmit}>SUBMIT</PurpleFancyButton>
  </div>
}

export default ContactForm
