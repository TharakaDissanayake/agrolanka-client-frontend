import React from 'react'

import './OurApp.css';
function OurApp() {
    return (
        <section className="app-section sec-padding" id="app">
            <div className="container">

                <div className="row">
                    <div className='app-img'>
                        <img src='./movilapp.png' alt="img"/>
                    </div>
                    <div className='app-text-section'>
                        <h5>App</h5>
                        <h3>App is available now</h3>
                        <p>Here, you can mention a class name for the div element. After that, you can apply the text-align with the center</p>
                        <div className='playStoreAdd'>
                            <img src='./app1.png' alt="img"/>
                            <img src='./app2.png' alt="img"/>
                        </div>
                    </div>


                </div>

            </div>
        </section>
    )
}

export default OurApp;


