import React, { useState, useEffect ,useContext} from 'react'
import db from '../../firebase';
import './Comments.css';
import firebase from 'firebase';
import CommentItem from './CommentItem';
import SendIcon from '@material-ui/icons/Send';
import UserContext from "../../context/UserContext";

function Comments({id}) {
    const [text, setText] = useState('');
    const { userData, setUserData } = useContext(UserContext);
    const [roomMessages, setRoomMessages] = useState([]);
    const roomId  = "1";
    const handleSendMsg = e => {
        db.collection('advertisements').doc(id).collection('comments').add({
        comment: text,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        user: userData.user.firstname,
        email:userData.user.email,
        userImage:null,})
        setText('');
        
    }
    const handleInputKeyUp = (e) => {
        if (e.keyCode == 13) {
            handleSendMsg();
        }
    }
    const getComments=async()=>{
        
        await db.collection('advertisements').doc(id)
        .collection('comments')
        .orderBy('timestamp', 'asc')
        .onSnapshot(snapshot => (
            setRoomMessages(
                snapshot.docs.map(doc => (
                    {
                        id: doc.id,
                        comment: doc.data().comment,
                        timestamp: doc.data().timestamp,
                        user: doc.data().user,
                        userImage: doc.data().userImage,
                        email:doc.data().email
                    }
                 
                ))
            ))
        )
    }
    useEffect(() => {

           getComments();
      }, [id])
    
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
               

                   <div className="chatWindow--btn" onClick={handleSendMsg}>
                        <SendIcon style={{ color: '#919191' }} />
                    </div>
                </div>}
                </div>:<span style={{color:'green'}}>To write your own comment please login first</span>}
            </div>
    
        {roomMessages.map(comment=>(
         
            <CommentItem comment={comment} adId={id}/>
         
        ))}
    </div>
    )
}

export default Comments
