import React, { useContext,useEffect ,useState}  from 'react'
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import { createBrowserHistory } from "history";
import HomeIcon from '@material-ui/icons/Home';
import BeenhereIcon from '@material-ui/icons/Beenhere';
import PostAddIcon from '@material-ui/icons/PostAdd';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import LockIcon from '@material-ui/icons/Lock';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { Link } from 'react-router-dom';
import UserContext from "../context/UserContext";
import db from '../firebase';
import firebase from 'firebase';


const history = createBrowserHistory();

function Header() {
    const { userData, setUserData } = useContext(UserContext);
    const [numOfNotifications,setNumOfNotifications]=useState(0);
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
      const getNotificationCount=async()=>{
        if(userData.user!==undefined)
        {
            await db.collection('notifications').doc(userData.user.id)
            .collection('notificationsList').where("seen", "==", false)
           .onSnapshot(snapshot => (
              setNumOfNotifications(snapshot.size)
            ))
        }
       
      }
      useEffect(() => {
        getNotificationCount();
      }, [userData])
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
                        <div style={{display:'flex'}}>
                        {userData.user && numOfNotifications>0 && <> <NotificationsIcon className="notify-mobile"/><div className="notify-mobile-count">{numOfNotifications}</div></>}
                        </div>
                      
                        <nav className="nav ">
                            <ul>
                            <a href="#"><img src='./logo.png' alt="img"/></a>
                                <li ><Link to="/"><HomeIcon className="header--icon"/>HOME</Link></li>
                                <li><a href="/menu?search=&location=&category=&page=1&size=12#ads-top"><BeenhereIcon className="header--icon"/>ALL ADS</a></li>
                                <li><Link to="/postAdvertisement"><PostAddIcon className="header--icon"/>POST NEW AD</Link></li>
                          
                                <li><Link to="/contact"><ContactMailIcon className="header--icon"/>CONTACT US</Link></li>
                                <li><Link to="/notifications"><div className="notification-area">NOTIFICATIONS{userData.user && numOfNotifications>0 && <><NotificationsIcon className="notification-icon"/><div className="notification-count">{numOfNotifications}</div></>}</div></Link></li>
                                {userData.user ?
        <li onClick={handleLogout}><Link><LockIcon className="header--icon"/>LOGOUT</Link></li> :
        <>
                <li><Link to="/login"><VpnKeyIcon className="header--icon"/>LOGIN / REGISTER</Link></li>
                                  
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
