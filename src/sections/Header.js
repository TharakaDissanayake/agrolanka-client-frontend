import React from 'react'
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';

import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

function Header() {
    return (
        <>
            <header className="header">
                <div className="container">
                    <div className="row justify-content-between align-items-center">
                        <div className="logo">
                            <a href="#">The webshala</a>
                        </div>
                        <input type="checkbox" id="nav-check" />
                        <label For="nav-check" className="nav-toggler">
                            <span>

                            </span>
                        </label>
                        <nav className="nav">
                            <ul>
                                <li><a href="#home">HOME</a></li>
                                <li><a href="#why-us">WHY US</a></li>
                                <li><a href="#courses">COURSES</a></li>
                                <li><a href="#reviews">REVIEWS</a></li>
                                <li><a href="#contact">CONTACT US</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
            {/* <div className="header">
                <img className="header_logo" src="./AmazonLogo.jpg" />

                <div className="header_search">
                    <input className="header_searchInput" type="text" />
                    <SearchIcon className="header_searchIcon" />
                </div>
                <div className="header_nav">
                    <div className="header_option">
                        <span className="header_optionLineOne">Hello guest</span>
                        <span className="header_optionLineTwo">sign in</span>
                    </div>
                    <div className="header_option">
                        <span className="header_optionLineOne">Returns</span>
                        <span className="header_optionLineTwo">& orders</span>
                    </div>
                    <div className="header_option">
                        <span className="header_optionLineOne">Your</span>
                        <span className="header_optionLineTwo">prime</span>
                    </div>
                    <div className="header_OptionBasket">
                        <ShoppingBasketIcon size={20} />
                        <span className="header_optionLineTwo header_BasketCount">0</span>
                    </div>
                </div>
            </div> */}
        </>
    )
}

export default Header
