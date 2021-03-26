import React from 'react'
import { Link } from 'react-router-dom';

import './About.css';
function About() {
    return (
        <section className="about-section sec-padding" id="about">
            <div className="container">
                <div className="row">
                    <div className="section-img">
                        <img src='./21.jpg' alt="img"/>
                    </div>
                    <div className="section-text">
                        <h5>About us</h5>
                        <h6>AgroLanka is the most popular online agro marketplace in Sri Lanka</h6>
                        <p>You can post your advertisements on our platform totally free of charge and it will help you to get more customers to your business.</p>
                        <Link to='/contact' type='submit' className='btn btn-1'>Explore History</Link>
                    </div>

                </div>




            </div>
        </section>
    )
}

export default About;
