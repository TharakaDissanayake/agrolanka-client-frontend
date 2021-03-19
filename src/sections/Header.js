import React, { useContext }  from 'react'
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import { createBrowserHistory } from "history";
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link } from 'react-router-dom';
import UserContext from "../context/UserContext";
const history = createBrowserHistory();

function Header() {
    const { userData, setUserData } = useContext(UserContext);
    const handleLogout = () => {
        try {
        //   handleMenuClose();
    
          setUserData({
            token: undefined,
            user: undefined,
          });
          localStorage.setItem("auth-token", "");
        }
        catch (err) {
          console.log(err);
        }
      }
    return (
        <>   

            <header className="header">
<div className ='magic-shadow'>
                <div className="container">
                    <div className="row justify-content-between align-items-center">

                        <div className="logo">
                            <a href="#"><img src='./logo.png' alt="img"/></a>
                        </div>
                        <input type="checkbox" id="nav-check" />
                        <label For="nav-check" className="nav-toggler">
                            <span>

                            </span>
                        </label>
                        <nav className="nav ">
                            <ul>
                            <a href="#"><img src='./logo.png' alt="img"/></a>
                                <li><Link to="/">HOME</Link></li>
                                <li><a href="/menu?search=&location=&category=&page=1&size=12">ALL ADS</a></li>
                                <li><Link to="/postAdvertisement">POST NEW AD</Link></li>
                                <li><a href="#menu">DIRECTORY</a></li>
                                <li><Link to="/contact">CONTACT US</Link></li>
                                {userData.user ?
        <li onClick={handleLogout}><Link>LOGOUT</Link></li> :
        <>
                <li><Link to="/login">LOGIN / REGISTER</Link></li>
                                  
        </>
      }
                       

                            </ul>
                        </nav>
                    </div>
                </div>
                </div>
            </header>
           
     
        </>
    )
}

export default Header
