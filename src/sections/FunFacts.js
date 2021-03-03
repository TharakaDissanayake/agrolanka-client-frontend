import React from 'react'
import FunFactsCard from '../components/FunFactsCard';
import './FunFacts.css';
function FunFacts() {
    return (
        <section className="fun-facts-section sec-padding">
            <div className="container">
                <div className="row">
                    <div className="section-title">
                        <h2>Our <span>Achievements</span></h2>
                    </div>
                </div>
                <div className="row">
                    <div className="fun-facts-img">
                        <img src='./fun-facts-img.png' />
                    </div>
                    <div className="fun-facts-items">
                        <div className="row">
                            <FunFactsCard />
                            <FunFactsCard />
                            <FunFactsCard />
                            <FunFactsCard />
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default FunFacts;