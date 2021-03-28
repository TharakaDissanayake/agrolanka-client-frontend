import { LinearProgress } from '@material-ui/core'
import React from 'react'
import Footer from '../sections/Footer'
import Header from '../sections/Header'

function Loading() {
    return (
        <div>
        <Header/>
        <div className='progress-section'>
        
        <h5>Loading...</h5>
        <LinearProgress  />
        </div>
                <Footer/>
              </div>
    )
}

export default Loading
