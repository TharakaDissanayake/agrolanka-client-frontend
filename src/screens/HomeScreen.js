import React from 'react'

import Services from '../sections/homeScreen/Services';
import Footer from '../sections/Footer';

import Header from '../sections/Header';

import Menu from '../sections/homeScreen/Menu';
import About from '../sections/homeScreen/About';
import Jumbotron from '../sections/homeScreen/Jumbotron';
import OurApp from '../sections/homeScreen/OurApp';
import PopupChat from '../components/PopupChat';
function HomeScreen() {
    return (
        <div>
              <Header/>
       
                <Jumbotron/>
     <About />
    <Menu />
 <Services />


<OurApp/>
   <Footer/>
        </div>
    )
}

export default HomeScreen
