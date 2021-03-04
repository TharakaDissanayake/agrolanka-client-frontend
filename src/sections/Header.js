import React from 'react'
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';

import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

function Header() {
    return (
        <>   <div className='circle' />

            <header className="header">

                <div className="container">
                    <div className="row justify-content-between align-items-center">

                        <div className="logo">
                            <a href="#"><img src='./logo.jpg' /></a>
                        </div>
                        <input type="checkbox" id="nav-check" />
                        <label For="nav-check" className="nav-toggler">
                            <span>

                            </span>
                        </label>
                        <nav className="nav">
                            <ul>
                                <li><a href="#home">HOME</a></li>
                                <li><a href="#about">ABOUT</a></li>
                                <li><a href="#services">SERVICES</a></li>
                                <li><a href="#menu">MENU</a></li>
                                <li><a href="#contact">CONTACT US</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
            <section className="home-section" id="home">

                <div className="container">
                    <div className="row h-100 align-items-center align-content-center">
                        <div className='content'>
                            <div className='textBox'>
                                <h2>Taste the Feeling</h2>
                                <h5>Lorem Ipsum is simply dummy text </h5>
                                <button type='submit' className='btn btn-1'>View Menu</button>
                            </div>

                        </div>
                        <div className="home-img">
                            <div className="home-img-inner">

                                <img src="./home.png"></img>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default Header
