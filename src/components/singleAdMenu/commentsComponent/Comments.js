import React, { useState, useEffect ,useContext} from 'react'
import db from '../../../firebase';
import './Comments.css';
import firebase from 'firebase';
import CommentItem from './CommentItem';
import SendIcon from '@material-ui/icons/Send';
import UserContext from "../../../context/UserContext";
import baseUrl from '../../../config/api';

function Comments({adId,advertisementPublisher,adImgUrl}) {
    const [text, setText] = useState('');
    const { userData, setUserData } = useContext(UserContext);
    const [roomComments, setroomComments] = useState([]);
   
    const handleSendComment = e => {
        db.collection('advertisements').doc(adId).collection('comments').add({
        comment: text,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        user: userData.user.firstname,
        userID:userData.user.id,
        userImage:null,
        replyCount:0
    })
        setText('');
        if(userData.user.id!==advertisementPublisher){
 
        db.collection('notifications').doc(advertisementPublisher).collection('notificationsList').add({
            title:`${userData.user.firstname} commented on advertisement you published`,
            content:text,
            sender: userData.user.firstname,
            senderID:userData.user.id,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            redirectUrl:`/advertisements/${adId}`,
            seen:false,
            imgUrl:adImgUrl
        })}
        
    }
    const handleInputKeyUp = (e) => {
        if (e.keyCode == 13) {
            handleSendComment();
        }
    }
    const getComments=async()=>{
        
        await db.collection('advertisements').doc(adId)
        .collection('comments')
        .orderBy("timestamp", "desc")
      
        .onSnapshot(snapshot => (
            setroomComments(
                snapshot.docs.map(doc => (
                    {
                        id: doc.id,
                        comment: doc.data().comment,
                        timestamp: doc.data().timestamp,
                        user: doc.data().user,
                        userImage: doc.data().userImage,
                        userID:doc.data().userID,
                        replyCount:doc.data().replyCount
                    }
                 
                ))
            )
            )
        )
        ////////////////////////////
        
    }
    useEffect(() => {

           getComments();
      }, [adId])
    
    return (
        <div>
              <div className="chatWindow--footer">
            {userData.user?  <div className="chatWindow--footer"> 
            <div className="chatWindow-inputarea">
                  
                    <input
                 
                        className="chatWindow--input"
                        type="text"
                        value={text}
                        onChange={e => setText(e.target.value)}
                        placeholder="Type your comment here"
                        onKeyUp={handleInputKeyUp}
                    />
                  
                </div>
                {text !== '' &&  <div className="chatWindow-pos">
               

                   <div className="chatWindow--btn" onClick={handleSendComment}>
                        <SendIcon style={{ color: '#919191' }} />
                    </div>
                </div>}
                </div>:<span style={{color:'green'}}>To write your own comment please login first</span>}
            </div>
    
        {roomComments.map(comment=>(
         
            <CommentItem comment={comment} adId={adId} advertisementPublisher={advertisementPublisher} adImgUrl={adImgUrl}/>
         
        ))}
    </div>
    )
}

export default Comments
