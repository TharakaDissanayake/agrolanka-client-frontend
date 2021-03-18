import React from 'react'
import Contact from '../sections/homeScreen/Contact';
import Services from '../sections/homeScreen/Services';
import Footer from '../sections/Footer';

import Header from '../sections/Header';

import Menu from '../sections/homeScreen/Menu';
import About from '../sections/homeScreen/About';
import Jumbotron from '../sections/homeScreen/Jumbotron';
function HomeScreen() {
    return (
        <div>
              <Header/>
                <Jumbotron/>
     <About />
    <Menu />
 <Services />


   <Contact />
   <Footer/>
        </div>
    )
}

export default HomeScreen
