import React, { useState, useEffect ,useContext} from 'react'
import './CommentItem.css';
import UserContext from "../../context/UserContext";
import SendIcon from '@material-ui/icons/Send';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import DeleteIcon from '@material-ui/icons/Delete';
import db from '../../firebase';
import firebase from 'firebase';
import ReplyComment from './ReplyComment';
function CommentItem({comment,adId}) {
    const { userData, setUserData } = useContext(UserContext);
    const [reply, setReply] = useState('');
    const [replyList, setReplyList] = useState('');
    const [showReplyBtn,setShowReplyBtn]=useState(false);
    // const [replyMessages,setReplyMessages]=useState([]);
    const handleSendReply=()=>{
        db.collection('advertisements').doc(adId).collection('comments').doc(comment.id).collection('replys').add({
            reply: reply,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            user: userData.user.firstname,
            email: userData.user.email,
            userImage:null,})
         setReply('');
    }
    const handleInputKeyUp = (e) => {
        if (e.keyCode == 13) {
            handleSendReply();
        }
    }
    const deleteComment=(id)=>{
        db.collection('advertisements').doc(adId)
        .collection('comments').doc(id).delete();
    }
    const getComments=async()=>{
        
        await db.collection('advertisements').doc(adId)
        .collection('comments').doc(comment.id).collection('replys')
        .orderBy('timestamp', 'asc')
        .onSnapshot(snapshot => (
            setReplyList(
                snapshot.docs.map(doc => (
                    {
                        id: doc.id,
                        reply: doc.data().reply,
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
      }, [adId])
    
    return (

        <div className="messageLine">
           
            <div className="messageItem" >

            <span className="author"><img className="author--img" src='https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-vector-user-young-boy-avatar-icon-png-image_1538408.jpg' alt="img"/>{comment.user} </span>
            <div className="messageItemContent" >
                <div className="messageText">
                    {comment.comment}
                   
                </div>
               
                <div className="messageDate">
                {new Date(comment.timestamp?.toDate()).toUTCString()}
                {userData.user!==undefined && comment.email===userData.user.email && <DeleteIcon onClick={()=>deleteComment(comment.id)} style={{marginLeft:'5px',marginTop:'-10px'}}/>}
                </div>
                </div>
                {userData.user && !showReplyBtn ? <span onClick={()=>setShowReplyBtn(true)} style={{textAlign:'right',paddingRight:10}}>Reply</span> :null}
                {userData.user && showReplyBtn ? <span onClick={()=>setShowReplyBtn(false)} style={{textAlign:'right',paddingRight:10}}><ExpandLessIcon/></span> :null}
             
             {showReplyBtn && ReplyComment.length>0 && <div className="chatWindow--footer-reply"> 
   
             <ReplyComment replyList={replyList} adId={adId} commentId={comment.id}/>
        
                </div>}
                {showReplyBtn &&  <div className="chatWindow--footer-reply"> 
                <div className="chatWindow-inputarea-reply">
         

         <input
      
             className="chatWindow--input-reply"
             type="text"
             value={reply}
             onChange={e => setReply(e.target.value)}
             placeholder="Type your reply here"
             onKeyUp={handleInputKeyUp}
         />
       
     </div>
     
  
     
            </div>}
        </div>
        </div>
    )
}

export default CommentItem
