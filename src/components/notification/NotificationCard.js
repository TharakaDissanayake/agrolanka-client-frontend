import React,{useEffect,useState,useContext} from 'react'
import { Link } from 'react-router-dom';
import './NotificationCard.css';
import db from '../../firebase';
import firebase from 'firebase';
import DeleteIcon from '@material-ui/icons/Delete';
import PageviewIcon from '@material-ui/icons/Pageview';
import ChatIcon from '@material-ui/icons/Chat';
function NotificationCard({notification,userID}) {
const deleteNotification=()=>{
    db.collection('notifications').doc(userID).collection('notificationsList').doc(notification.id).delete();
}

const updateNotification=async()=>{
            db.collection('notifications').doc(userID).collection('notificationsList').doc(notification.id).update({
                seen:true
            })}  
useEffect(() => {
   updateNotification();
}, [])

    return (
        <div className="notification-card" >
        <p className='title'>{notification.title}</p>
        <div className='content-area'>
        <img src={notification.imgUrl} alt=""/>
        <div className='text-area'>
         <i style={{color:'gray'}}>{notification.content} sammika perera is on of the weakest </i> 
         <p className='date'>{new Date(notification.timestamp?.toDate()).toUTCString()}</p>
         </div>  
         
         </div>
         <div className='options-area'>
            <Link><ChatIcon style={{marginTop:'3px'}} className='option-icon'/></Link>
            <Link to={notification.redirectUrl}><PageviewIcon style={{marginTop:'1px'}} className='option-icon'/></Link>
            <Link><DeleteIcon onClick={deleteNotification} className='option-icon'/></Link>
         </div>
         {/* <Link to={notification.redirectUrl}>explore</Link>    
          <p>{notification.sender}</p>   
         <p>{notification.id}</p>     */}
        </div>
        
     
     
         
        
    )
}

export default NotificationCard
