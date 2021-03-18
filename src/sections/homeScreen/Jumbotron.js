import React from 'react'
import './Jumbotron.css';
function Jumbotron() {
    return (
        <section className="home-section" id="home">

        <div className="container">
            <div className="row h-100 align-items-center align-content-center">
                <div className='content'>
                    <div className='textBox'>
                        <h2>Welcome to <img src='./logo.png' alt="img"/></h2>
                        <h5>The largest agro marketplace in Sri Lanka! </h5>
                        
                        <div className='btngroup'>
                        <button type='submit' className='btn btn-2'>Post Your Ad</button>
                        <button type='submit' className='btn btn-1'>View All Ads</button>
                        
                        </div>
                       
             
                    </div>

                </div>
                <div className="home-img">
                    <div className="home-img-inner">

                        <img src="./7.png" alt="img"/>
                    </div>
                </div>

            </div>
        </div>
    </section>
    )
}

export default Jumbotron
