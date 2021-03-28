import React,{useState} from 'react'
import PleaseLogin from './PleaseLogin';
import './PopupChat.css';
import SendIcon from '@material-ui/icons/Send';
function PopupChat({userData}) {
    const [toggleChat,setToggleChat]=useState(false);
    const [showAdminChat,setShowAdminChat]=useState(false);
    const toggle=()=>{
        setToggleChat(!toggleChat)
        
    }
    if(userData.user===undefined){
      return (
        <div>
     

        <div onClick={toggle}><img src='./img/chat.svg' className="open-button" /></div>
        
        <div className={toggleChat?"form-popup-on":"form-popup-off"} id="myForm">
        
        <img className='popup-img' src='http://res.cloudinary.com/uwusam/image/upload/v1616764242/pvlylczd0qzbl7mnqaxi.png' alt="img"/>
          <div style={{textAlign:'center'}}><p>Sorry!!!.Please login before start a conversation</p></div>
           </div>
        </div>
      )
    }
    return (
     <div>
     

<div onClick={toggle}><img src='./img/chat.svg' className="open-button" /></div>

<div className={toggleChat?"form-popup-on":"form-popup-off"} id="myForm">
<div className={showAdminChat?'popup-start-window-false':'popup-start-window-true'}>
<img className='popup-img' src='http://res.cloudinary.com/uwusam/image/upload/v1616764242/pvlylczd0qzbl7mnqaxi.png' alt="img"/>
<div className='popup-content'>
  <h4>Hi {userData.user.firstname},</h4>
  <h6>Now you can chat with anyone who registered to this system</h6>
  <button onClick={()=>setShowAdminChat(true)} className='btn btn-2'><SendIcon/> Start Conversation</button>
</div>
</div>
<div className={showAdminChat?'popup-admin-window-true':'popup-admin-window-false'}>

  <button onClick={()=>setShowAdminChat(false)} className='btn btn-2'>back</button>
</div>
</div>
   </div>

  
    )
}

export default PopupChat
