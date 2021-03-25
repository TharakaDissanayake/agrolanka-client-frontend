import React,{useEffect,useState,useContext} from 'react'
import NotificationCard from '../components/notification/NotificationCard';
import Footer from '../sections/Footer';
import Header from '../sections/Header';
import UserContext from "../context/UserContext";
import db from '../firebase';
import firebase from 'firebase';
import './NotificationScreen.css';

function NotificationScreen() {
    const { userData, setUserData } = useContext(UserContext);
    const [notificationsList,setNotificationsList]=useState([]);

    const getNotifications=async()=>{
        
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
                        title:doc.data().title
                    }
                    
                 
                ))
            )
            )
        )}

        useEffect(() => {
            if(userData.user!==undefined){
            getNotifications();
      
            }
        }, [userData])
    return (
      
            <div>
            <Header/>
            <div className="notifications-section">
    {notificationsList.map(notification=>(<NotificationCard notification={notification} userID={userData.user.id}/>))}
    </div>
        <Footer/>
        </div>
  
    )
}

export default NotificationScreen
