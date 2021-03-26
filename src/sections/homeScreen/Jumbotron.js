import React from 'react'
import { Link } from 'react-router-dom';
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
                       <Link to='/postAdvertisement' type='submit' className='btn btn-2'>Post Your Ad</Link>
                        <a href='/menu?search=&location=&category=&page=1&size=12' type='submit' className='btn btn-1'>View All Ads</a>
                        
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
