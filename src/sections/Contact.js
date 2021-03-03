import React from 'react'
import ContactForm from '../components/ContactForm';
import './Contact.css';
function Contact() {
    return (
        <section className="contact-section sec-padding" id="contact">
            <div className="container">
                <div className="row">
                    <div className="section-title">
                        <h2><span>Contact</span> us</h2>
                    </div>
                </div>
                <div className="row">
                    <div className='contact-img'>
                        <img src='./contact-img.png' />
                    </div>
                    <div className='contact-form-section'>
                        <ContactForm />
                    </div>


                </div>

            </div>
        </section>
    )
}

export default Contact


