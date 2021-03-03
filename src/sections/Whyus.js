import React from 'react'
import WhyusCard from '../components/WhyusCard';
import './Whyus.css';
function Whyus() {
    return (
        <section className="why-us-section sec-padding" id="why-us">
            <div className="container">
                <div className="row">
                    <div className="section-title">
                        <h2>Why <span>us</span></h2>
                    </div>
                </div>
                <div className="row">
                    <WhyusCard />
                    <WhyusCard />
                    <WhyusCard />
                </div>
            </div>
        </section>
    )
}

export default Whyus
