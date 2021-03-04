import React from 'react'

import './Contact.css';
function Contact() {
    return (
        <section className="contact-section sec-padding" id="contact">
            <div className="container">

                <div className="row">
                    <div className='contact-img'>
                        <img src='./movil-app.png' />
                    </div>
                    <div className='contact-text-section'>
                        <h5>App</h5>
                        <h3>App is available now</h3>
                        <p>Here, you can mention a class name for the div element. After that, you can apply the text-align with the center</p>
                        <div className='playStoreAdd'>
                            <img src='./app1.png' />
                            <img src='./app2.png' />
                        </div>
                    </div>


                </div>

            </div>
        </section>
    )
}

export default Contact


