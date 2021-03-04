import React from 'react'
import ServicesCard from '../components/ServicesCard';
import './Services.css';

function Services() {
    return (
        <section className="services-section sec-padding" id="services">
            <div className="container">
                <div className="row section-title">

                    <h5>Offering</h5>

                    <h3>Our Amazing Services</h3>

                </div>
                <div className="row services-row">


                    <ServicesCard iconName='pizza2' title='Fast Food' />
                    <ServicesCard iconName='plate' title='Excellent Food' />
                    <ServicesCard iconName='truck' title='Fast Delivery' />


                </div>
            </div>
        </section>
    )
}

export default Services;
