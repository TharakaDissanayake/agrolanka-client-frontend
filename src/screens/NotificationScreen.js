import React,{useEffect,useState,useContext} from 'react'
import NotificationCard from '../components/notification/NotificationCard';
import Footer from '../sections/Footer';
import Header from '../sections/Header';
import UserContext from "../context/UserContext";
import db from '../firebase';
import firebase from 'firebase';
import './NotificationScreen.css';
import { Link } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
import Loading from '../components/Loading';
import PleaseLogin from '../components/PleaseLogin';


function NotificationScreen() {
    const { userData, setUserData } = useContext(UserContext);
    const [notificationsList,setNotificationsList]=useState([]);
    const [loading,setLoading]=useState(true);
    const getNotifications=async()=>{
        setLoading(true);
        await db.collection('notifications').doc(userData.user.id)
        .collection('notificationsList')
        .orderBy("timestamp", "desc")
       .onSnapshot(snapshot => (
            setNotificationsList(
                snapshot.docs.map(doc => (
                    
                    {
                        id: doc.id,
                        content: doc.data().content,
                        timestamp: doc.data().timestamp,
                        redirectUrl: doc.data().redirectUrl,
                        seen: doc.data().seen,
                        sender:doc.data().sender,
                        senderID:doc.data().senderID,
                        title:doc.data().title,
                        imgUrl:doc.data().imgUrl,
                    }
                    
                 
                ))
            )
            )
        )
        setTimeout(() => {
            setLoading(false)
        }, 2000);
        
    }

        useEffect(() => {
            if(userData.user!==undefined){
               
            getNotifications();
     
            }
            else{
               
                    setLoading(false)
              
            }
        }, [userData])
     
    return (
        loading ?<Loading/> :
      userData.user?
      notificationsList.length>0?
    
            <div>
            <Header/>
            <div className='container'>
            
                <div className="notifications-section">
             
    {notificationsList.map(notification=>(<NotificationCard notification={notification} userID={userData.user.id}/>))}
    </div>
          
            </div>
    
        <Footer/>
        </div>:  <div>
        <Header/>
            <div className='container'>
            <div className='no-notification-found'>
            <img src="./img/nodata.svg" className="image-notify" style={{  width: '200px',marginRight:'auto',marginLeft:'auto'}} alt="" />
          <span style={{fontSize:'20px',fontWeight:'600',marginTop:'30px'}}>Congratulations</span>
          <span>You have no notifications</span>

      </div>
      </div>
      <Footer/></div>:
         <PleaseLogin/>
  
    )
}

export default NotificationScreen
