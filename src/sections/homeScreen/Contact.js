import React from 'react'
import './Contact.css';
function Contact() {
    return (
        <section className="contact-section sec-padding" id="contact">
            <div className="container">

                <div className="row">
                    <div className='contact-map'>
                
 
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.0410869166412!2d81.11390651492819!3d6.125173329364577!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae6bcfeed0b4a8d%3A0x65c1ef2899f2dd90!2sAgriculture%20Office!5e0!3m2!1sen!2slk!4v1616144915916!5m2!1sen!2slk" width="100%" height="100%" allowFullScreen="" loading="lazy"></iframe>
                
                    </div>
                    <div className='contact-text-section'>
             
                    <div>
                        <div>
                            <img src="./phone-2.svg" alt="" />
                            <div>
                                <h5>Call Us</h5>
                                <h6>(+94) 123 232 432</h6>
                            </div>
                        </div>
                        <div>
                            <img src="./bag-2.svg" alt="" />
                            <h5>E-mail</h5>
                            <div>
                                
                                <h6>support@agrolanka.com</h6>
                            </div>
                        </div>
                       
                        <div className="input-wrap">
                        <input type="text" placeholder="Your feedback here" />
                        <button>Feedback</button>
                    </div>
                </div>
                    </div>


                </div>

            </div>
        </section>
    )
}

export default Contact;
