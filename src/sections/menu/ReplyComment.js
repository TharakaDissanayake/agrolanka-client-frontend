import React,{useContext} from 'react'
import './ReplyComment.css';
import UserContext from "../../context/UserContext";
import DeleteIcon from '@material-ui/icons/Delete';
import db from '../../firebase';
import firebase from 'firebase';
function ReplyComment({replyList,adId,commentId}) {
    const { userData, setUserData } = useContext(UserContext);
    const deleteReply=(id)=>{
        db.collection('advertisements').doc(adId)
        .collection('comments').doc(commentId).collection('replys').doc(id).delete();
    }
    return (
        <div>
              {replyList.map(reply=>(
         
         <div className="replyLine">
             <div className="replyItem" >
 
 <span className="author"><img className="author--img" src='https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-vector-user-young-boy-avatar-icon-png-image_1538408.jpg' alt="img"/>{reply.user}</span>
 <div className="replyItemContent" >
     <div className="replyText">
         {reply.reply}
     </div>
     <div className="replyDate">
     {new Date(reply.timestamp?.toDate()).toUTCString()}
     {userData.user!==undefined && reply.email===userData.user.email && <DeleteIcon onClick={()=>deleteReply(reply.id)} style={{marginRight:'40px',marginTop:'-10px',position:'absolute'}}/>}
     </div>
     </div>
     </div>
             </div>
       
      ))}
        </div>
    )
}

export default ReplyComment
