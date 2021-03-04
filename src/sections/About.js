import React from 'react'

import './About.css';
function About() {
    return (
        <section className="about-section sec-padding" id="about">
            <div className="container">
                <div className="row">
                    <div className="section-img">
                        <img src='./about.jpg' />
                    </div>
                    <div className="section-text">
                        <h5>About us</h5>
                        <h3>We cook the best tasty food</h3>
                        <p>We cook the best food for the entire city with excellent customer service.The best meals at the best price .Visit us</p>
                        <button type='submit' className='btn btn-1'>Explore History</button>
                    </div>

                </div>




            </div>
        </section>
    )
}

export default About;
