import './Reviews.css';
import React from 'react'
import ReviewCard from '../components/ReviewCard';

function Reviews() {
    return (
        <section className="reviews-section sec-padding" id="reviews">
            <div className="container">
                <div className="row">
                    <div className="section-title">
                        <h2>what our <span>students</span> saying</h2>
                    </div>
                </div>
                <div className="row ">

                    <ReviewCard />
                    <ReviewCard />
                    <ReviewCard />
                    <ReviewCard />
                </div>
            </div>
        </section>
    )
}

export default Reviews
