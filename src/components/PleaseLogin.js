import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../sections/Footer'
import Header from '../sections/Header'

function PleaseLogin() {
    return (
        <div>
        <Header/>
        <div className='progress-section'>
        
          <h5  style={{ color: "red" }}>
            please login first
            </h5>
          <Link to="/login">
            <h6  style={{ color: "green" }}>
              click here for login or signup
              </h6>
          </Link>

        
        </div>
                <Footer/>
              </div>
    )
}

export default PleaseLogin
