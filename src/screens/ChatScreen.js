import React, { useState, useEffect ,useContext} from 'react';
import './ChatScreen.css';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';

import UserContext from "../context/UserContext";
import AddIcon from '@material-ui/icons/Add';
import db from '../firebase';
import firebase from 'firebase';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PleaseLogin from '../components/PleaseLogin';
import Chatintro from '../components/chat/Chatintro';
import NewChat from '../components/chat/NewChat';
import Chatlistitem from '../components/chat/Chatlistitem';
import ChatWindow from '../components/chat/ChatWindow';
import Header from '../sections/Header';
import Footer from '../sections/Footer';
import { useParams } from "react-router-dom";
function ChatScreen() {
  const { userChatID } = useParams();
    const { userData, setUserData } = useContext(UserContext);
  const [fullChatScreen, setFullChatScreen] = useState(false);
  const [chatlist, setChatlist] = useState([]);
  const [activeChat, setActiveChat] = useState({});
  const [userFromSingleAdMenu, setUserFromSingleAdMenu] = useState(null);
  const [showNewChat, setShowNewChat] = useState(false);
  
////////////////////////////from single ad menu
const getContactDetails= async (userId) => {
let userObj=null;
return db.collection('users').doc(userId).get().then((doc) => {
  if (doc.exists) {
   
    userObj={id: doc.id,
    firstname:doc.data().firstname,
    avatar:doc.data().avatar}
   
   }
   return userObj;
  }).catch((error) => {
      return {};
  });}




const getExistsUser= async (user, user2) => {
  let existingUser = false;
  let chatID = '';
  return db.collection('users').doc(user.id).get().then((doc) => {
      if (doc.exists) {
          doc.data().chats.map(chat => {
              if (chat.with === user2.id) {
                  existingUser = true
                  chatID = chat.chatId;
              }
          });
      }
      return existingUser;
  }).catch((error) => {
      return false;
  });}
const addNewChatDatabase= async (user, user2) => {

  let now = new Date();
  let newChat = await db.collection('chats').add({
      messages: firebase.firestore.FieldValue.arrayUnion({
          type: 'text',
          author: user.id,
          body: ' New conversation between ' + user.firstname + ' & ' + user2.firstname,
          date: now
      }),
      users: [user.id, user2.id]
  });


  db.collection('users').doc(user.id).update({
      chats: firebase.firestore.FieldValue.arrayUnion({
          chatId: newChat.id,
          title: user2.firstname,
          image: 'https://png.pngtree.com/png-vector/20190321/ourmid/pngtree-vector-users-icon-png-image_856952.jpg',
          with: user2.id
      })
  });
  db.collection('users').doc(user2.id).update({
      chats: firebase.firestore.FieldValue.arrayUnion({
          chatId: newChat.id,
          title: user.firstname,
          image: 'https://png.pngtree.com/png-vector/20190321/ourmid/pngtree-vector-users-icon-png-image_856952.jpg',
          with: user.id
      })
  });

      }
const addActiveChat=async(user, user2)=>{
        await db.collection('users').doc(user.id).get().then((doc) => {
          if (doc.exists) {
              doc.data().chats.map(chat => {
                  if (chat.with === user2.id) {
                     setActiveChat(chat);
                    
                  }
              });}})
      }
      
///////////////////////////
  const handleNextChat = () => {
  
    setShowNewChat(!showNewChat);
  }

  const loadFunc = async () => {
  
    if (userData.user !== undefined) {
      db.collection('users').doc(userData.user.id).onSnapshot((doc) => {
            if (doc.exists) {
                let data = doc.data();
                if (data.chats) {
                    let chats = [...data.chats];
                    chats.sort((a, b) => {
                        if (a.lastMessageDate === undefined) {
                            return -1;
                        }
                        if (b.lastMessageDate === undefined) {
                            return -1;
                        }
                        if (a.lastMessageDate.seconds < b.lastMessageDate.seconds) {
                            return 1;
                        }
                        else {
                            return -1;
                        }
                    })
                    setChatlist(chats);
                   console.log(chats);
               
                }
            }
        })

    }
  }
  const loadFunc1=async()=>{
    if(userChatID){
     const userObj=await getContactDetails(userChatID);
  
      if(userObj!=null)
      {
        const result2 =await getExistsUser(userData.user,userObj);
      
        if (result2 !== true) {
          await addNewChatDatabase(userData.user,userObj);
        }
        await addActiveChat(userData.user,userObj);
     
      }

    }
  }
  useEffect(() => {
 
 loadFunc1();
     
    
    loadFunc();

  }, [])
  if (userData.user !== undefined) {

    return (
        <>
            <Header/>
      
      <div className="app-window">
 
        <div className={!fullChatScreen ? "sidebar" : "sidebar-mobile"}>
        <div className={showNewChat?'sidebar-content-2-show':'sidebar-content-2-hide'}>
          <NewChat
            chatlist={chatlist}
            user={userData.user}
            show={showNewChat}
            setShow={setShowNewChat}
          />
          </div>
          <div className={!showNewChat?'sidebar-content-1-show':'sidebar-content-1-hide'}>
          <div className='chat--header'>
              <div style={{display:'flex',marginTop:'10px'}}>
            <img className={!fullChatScreen ? "header--avatar" : "header--avatar-mobile"} src='./img/user2.svg' alt="" />
            <p style={{marginLeft:'5px',marginTop:'10px'}}>{userData.user.firstname}</p>
            </div>
            <div className={!fullChatScreen ? "header--buttons" : "header--buttons-mobile"}>
             
              <div onClick={handleNextChat} className="header--btn">
                <AddIcon style={{ color: '#919191' }} />
              </div>
            
            </div>
          </div>
         
          <div className="chatlist">
           {chatlist.map((item, key) => (
              <Chatlistitem
                key={key}
                data={item}
                active={activeChat.chatId === chatlist[key].chatId}
                onClick={() => { setActiveChat(chatlist[key]); setFullChatScreen(!fullChatScreen);console.log(chatlist[key]) }}
              />

             ))}
          </div>
        </div>
   </div>

     
        <div className={!fullChatScreen ? "contentarea" : "contentarea-mobile"} >
          {
            activeChat.chatId !== undefined &&
            <ChatWindow
              user={userData.user}
              data={activeChat}
              setFullChatScreen={(result) => setFullChatScreen(result)}
              fullChatScreen
            />
          }
          {activeChat.chatId === undefined &&
            <Chatintro />}
        </div>
      </div>


      </>
    );
  }

  if (userData.user === undefined) {
    return (<PleaseLogin/>)
  }
}
export default ChatScreen;
