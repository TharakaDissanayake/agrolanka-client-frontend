import React, { useState, useEffect } from 'react'
import './NewChat.css';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import db from '../../firebase';

import firebase from 'firebase';
function NewChat({ user, chatlist, show, setShow }) {
    const [list, setList] = useState([])
    const handleClose = () => {
        setShow(false);
    }

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
        });



    }
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
    const addNewChat = async (user2) => {

        const result = await getExistsUser(user, user2);
        console.log(result)
        if (result !== true) {
            await addNewChatDatabase(user, user2);
        }
        handleClose();
    }
    const getContactList= async (userId) => {
        let list = [];
        let results = await db.collection('users').get();
        results.forEach(result => {
            let data = result.data();
            if (result.id !== userId) {
                list.push({
                    id: result.id,
                    firstname: data.firstname,
                    avatar:'https://png.pngtree.com/png-vector/20190321/ourmid/pngtree-vector-users-icon-png-image_856952.jpg'
                })
            }
        })
        return list;
    }
    useEffect(() => {

        const getList = async () => {
            if (user !== undefined) {
                let results = await getContactList(user.id);
                setList(results);
                console.log(results);
            }
        }
        getList();
    }, [user])
    return (
        <div className="newChat " style={{ top: show ? 300 : -415 }}>
            <div className="newChat--head">
                <div onClick={handleClose} className="newChat--backbutton">
                    <ArrowBackIcon style={{ color: 'gray' }} />
                </div>
                <div className="newChat--headtitle">
                    Start New conversation
</div>

            </div>
            <div className="newChat--list">
                {list.map((item, key) => (
                    <div onClick={() => addNewChat(item)} className="newChat--item" key={key}>
                        <img className="newChat--itemavatar" src='https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-vector-user-young-boy-avatar-icon-png-image_1538408.jpg'alt="test" />

                        <div className="newChat--itemname" >{item.firstname}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default NewChat
