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
        setLoading(false)
    }

        useEffect(() => {
            if(userData.user!==undefined){
               
            getNotifications();
     
            }
            else{
                setLoading(false);
            }
        }, [userData])
     
    return (
        loading ?<div>
        <Header/>
        <div className='progress-section'>
        
        <h5>Loading...</h5>
        <LinearProgress  />
        </div>
                <Footer/>
              </div> :
      userData.user?
            <div>
            <Header/>
            <div className='container'>
               
                <div className="notifications-section">
    {notificationsList.map(notification=>(<NotificationCard notification={notification} userID={userData.user.id}/>))}
    </div>
          
            </div>
      
        <Footer/>
        </div>:
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

export default NotificationScreen
