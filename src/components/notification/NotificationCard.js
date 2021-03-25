import React,{useEffect,useState,useContext} from 'react'
import { Link } from 'react-router-dom';
import './NotificationCard.css';
import db from '../../firebase';
import firebase from 'firebase';
function NotificationCard({notification,userID}) {
  

    const updateNotification=async()=>{
            db.collection('notifications').doc(userID).collection('notificationsList').doc(notification.id).update({
                seen:true
            })}  
useEffect(() => {
   updateNotification();
}, [])

    return (
        <div>
         <p>{notification.title}</p>   
         <p>{notification.content}</p>   
         <p>{notification.sender}</p>   
         <p>{notification.id}</p>   
         <p>{new Date(notification.timestamp?.toDate()).toUTCString()}</p>
         <Link to={notification.redirectUrl}>explore</Link>   
        </div>
    )
}

export default NotificationCard
