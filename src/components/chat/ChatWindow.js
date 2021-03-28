import React, { useState, useEffect, useRef } from 'react'
import './ChatWindow.css';
import EmojiPicker from 'emoji-picker-react';
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import MicIcon from '@material-ui/icons/Mic';
import MessageItem from './MessageItem';
import db from '../../firebase';

import firebase from 'firebase';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
////////////////////////////////////////

///////////////////////////////////////
function ChatWindow({ user, data, setFullChatScreen, fullChatScreen }) {

    const body = useRef();
    const textInput=useRef();
    const [listening, setListening] = useState(false);
    const [text, setText] = useState('');
    const [emojiOpen, setEmojiOpen] = useState(false);
    const [messageList, setMessageList] = useState([]);
    const [users, setUsers] = useState([]);
    const handleEmojiClick = (e, emojiObject) => {
        setText(text + emojiObject.emoji);
        textInput.current.focus();
    }
    const sendMessage= async (chatData, userId, type, body, users) => {
        let now = new Date();
        db.collection('chats').doc(chatData.chatId).update({
            messages: firebase.firestore.FieldValue.arrayUnion({
                type,
                author: userId,
                body,
                date: now
            })
        })
 
        // for (let i in users) {
            
            let u1 = await db.collection('users').doc(userId).get();
            let uData1 = u1.data();
            if (uData1.chats) {
                let chats1 = [...uData1.chats];
                for (let e in chats1) {
                    if (chats1[e].chatId == chatData.chatId) {
                  
                     
                            chats1[e].lastMessage = body;
                            chats1[e].lastMessageDate = now;
                            chats1[e].lastMessageSeen = true;
                            chats1[e].sender =true;
                    
                  
                       
                    }
                }
                await db.collection('users').doc(userId).update({
                    chats:chats1
                })
            }
            /////////////////////////
            let u2 = await db.collection('users').doc(chatData.with).get();
            let uData2 = u2.data();
            if (uData2.chats) {
                let chats2 = [...uData2.chats];
                for (let e in chats2) {
                    if (chats2[e].chatId == chatData.chatId) {
                  
                     
                            chats2[e].lastMessage = body;
                            chats2[e].lastMessageDate = now;
                            chats2[e].lastMessageSeen = false;
                            chats2[e].sender =false;
                    
                  
                       
                    }
                }
                await db.collection('users').doc(chatData.with).update({
                    chats:chats2
                })
            }
            ////////////////////////
        // }
    }
    const onChatContent=async(chatId, setMessageList, setUsers) => {
        return await db.collection('chats').doc(chatId).onSnapshot((doc) => {
            if (doc.exists) {
                let data = doc.data();
                setMessageList(data.messages);
                setUsers(data.users);
            }
        })
    }
    const handleOpenEmoji = () => {
        setEmojiOpen(!emojiOpen);
    }
    const handleSendMsg = () => {
        if (text !== '') {
            sendMessage(data, user.id, 'text', text, users);
            setText('');
            setEmojiOpen(false);
           
        }
    }
    const handleSendAudio = () => { }


    const handleInputKeyUp = (e) => {
        if (e.keyCode == 13) {
            handleSendMsg();
        }
    }
    useEffect(() => {
      
        setMessageList([]);
        let unsubscribe =onChatContent(data.chatId, setMessageList, setUsers);
        return unsubscribe;
    }, [data.chatId])
    useEffect(() => {
        if (body.current.scrollHeight > body.current.offsetHeight) {
            body.current.scrollTop = body.current.scrollHeight - body.current.offsetHeight;
        }
    }, [messageList])
    return (
        <div className="chatWindow">
            <div className={!fullChatScreen ? "chatWindow--header" : "chatWindow--header-mobile"}>
                <div className="chatWindow--headerInfo">
                    <KeyboardBackspaceIcon onClick={fullChatScreen => setFullChatScreen(!fullChatScreen)} className='chatWindow--backButton' style={{ marginLeft: '20px', color: 'gray' }} />
              
                </div>
                <div className="chatWindow--headerbuttons">
                <img className="chatWindow--avatar" src={data.image} alt="" />

<p style={{marginTop:'15px'}}>{data.title}</p>
                </div>
            </div>
            <div ref={body} className="chatWindow--body">
                {messageList.map((item, key) => (
                    <MessageItem key={key} data={item} user={user}
                    />
                ))}


            </div>

            <div className="chatWindow--emojiarea"
                style={{ height: emojiOpen ? '200px' : '0' }}
            >
                <EmojiPicker
                    onEmojiClick={handleEmojiClick}
                    disableSearchBar
                    disableSkinTonePicker
                />
            </div>


            <div className="chatWindow--footer">
                <div className="chatWindow-pre">
                    <div className="chatWindow--btn" onClick={handleOpenEmoji} style={{ width: emojiOpen ? 40 : 0 }}>
                        <CloseIcon style={{ color: '#919191' }} />
                    </div>
                    <div className="chatWindow--btn"
                        onClick={handleOpenEmoji}
                    >
                        <InsertEmoticonIcon style={{ color: emojiOpen ? '#009688' : '#919191' }} />
                    </div>
                </div>
                <div className="chatWindow-inputarea">
                    <input
                    ref={textInput}
                        className="chatWindow--input"
                        type="text"
                        value={text}
                        onChange={e => setText(e.target.value)}
                        placeholder="Type your message here"
                        onKeyUp={handleInputKeyUp}
                    />
                </div>
                <div className="chatWindow-pos">
                    {text === '' && <div className="chatWindow--btn" onClick={handleSendAudio}>
                        <MicIcon style={{ color: listening ? '#126ECE' : '#919191' }} />
                    </div>}

                    {text !== '' && <div className="chatWindow--btn" onClick={handleSendMsg}>
                        <SendIcon style={{ color: '#919191' }} />
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default ChatWindow
