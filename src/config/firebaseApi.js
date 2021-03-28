// import firebase from 'firebase/app';
// import 'firebase/firebase-auth';
// import 'firebase/firebase-firestore';

// import firebaseConfig from './firebaseConfig';


// const firebaseApp = firebase.initializeApp(firebaseConfig);
// const db = firebaseApp.firestore();

// export default {
//     fbPopup: async () => {
//         const provider = new firebase.auth.GoogleAuthProvider();
//         let result = await firebaseApp.auth().signInWithPopup(provider);
//         return result;
//     },
//     sendComments:async(adId,userData,text)=>{
//         await db.collection('advertisements').doc(adId).collection('comments').add({
//             comment: text,
//             timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//             user: userData.user.firstname,
//             userID:userData.user.id,
//             userImage:null,
//             replyCount:0
//         })
//     },
//     sendNotification:async(advertisementPublisher,userData,text,adId,adImgUrl)=>{
//         await db.collection('notifications').doc(advertisementPublisher).collection('notificationsList').add({
//             title:`${userData.user.firstname} commented on advertisement you published`,
//             content:text,
//             sender: userData.user.firstname,
//             senderID:userData.user.id,
//             timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//             redirectUrl:`/advertisements/${adId}`,
//             seen:false,
//             imgUrl:adImgUrl
//         })
//     },
//     getComments:async(adId)=>{
//         let comments=[];
//         await db.collection('advertisements').doc(adId)
//         .collection('comments')
//         .orderBy("timestamp", "desc")
      
//         .onSnapshot(snapshot => (
//             comments.push(
//                 snapshot.docs.map(doc => (
//                     {
//                         id: doc.id,
//                         comment: doc.data().comment,
//                         timestamp: doc.data().timestamp,
//                         user: doc.data().user,
//                         userImage: doc.data().userImage,
//                         userID:doc.data().userID,
//                         replyCount:doc.data().replyCount
//                     }
                 
//                 ))
//             )
//             )
//         )
//         return comments;
//     },
//     handleSendReplyComment:async(adId,commentId,reply,userData)=>{
//      await db.collection('advertisements').doc(adId).collection('comments').doc(commentId).collection('replys').add({
//             reply: reply,
//             timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//             user: userData.user.firstname,
//             userID: userData.user.id,
//             userImage:null,})
//     },
//     updateReplyCount:async(adId,comment)=>{
//         await db.collection('advertisements').doc(adId).collection('comments').doc(comment.id).update({
//             replyCount:comment.replyCount+1
         
//         })
//     },
//     sendReplyNotification1:async(advertisementPublisher,userData,reply,adId,adImgUrl)=>{
//         await db.collection('notifications').doc(advertisementPublisher).collection('notificationsList').add({
//             title:`${userData.user.firstname} reply to a comment on advertisement you published`,
//             content:reply,
//             sender: userData.user.firstname,
//             senderID:userData.user.id,
//             timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//             redirectUrl:`/advertisements/${adId}`,
//             seen:false,
//             imgUrl:adImgUrl
//         })
//     },
//     sendReplyNotification2:async(comment,userData,reply,adId,adImgUrl)=>{
//         await db.collection('notifications').doc(comment.userID).collection('notificationsList').add({
//             title:`${userData.user.firstname} reply to your comment`,
//             content:reply,
//             sender: userData.user.firstname,
//             senderID:userData.user.id,
//             timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//             redirectUrl:`/advertisements/${adId}`,
//             seen:false,
//             imgUrl:adImgUrl
//         })
//     },
//     deleteComment:async(adId,id)=>{
//         await db.collection('advertisements').doc(adId).collection('comments').doc(id).delete();
//     },
//     getReplyComments:async(adId,commentId)=>{
//         let replies=[];
//         await db.collection('advertisements').doc(adId)
//         .collection('comments').doc(commentId).collection('replys')
//         .orderBy("timestamp", "desc")
//         .onSnapshot(snapshot => (
//             replies.push(
//                 snapshot.docs.map(doc => (
//                     {
//                         id: doc.id,
//                         reply: doc.data().reply,
//                         timestamp: doc.data().timestamp,
//                         user: doc.data().user,
//                         userImage: doc.data().userImage,
//                         userID:doc.data().userID
//                     }
                 
//                 ))
//             ))
//         )
//         return replies;
//     },
//     deleteReply:async(adId,comment,id)=>{
//         db.collection('advertisements').doc(adId).collection('comments').doc(comment.id).collection('replys').doc(id).delete();
//         db.collection('advertisements').doc(adId).collection('comments').doc(comment.id).update({
//             replyCount:comment.replyCount-1
         
//         })
//     },
//     addUser: async (u) => {
//         await db.collection('users').doc(u.id).set({
//             name: u.name,
//             avatar: u.avatar
//         }, { merge: true })
//     },
//     getContactList: async (userId) => {
//         let list = [];
//         let results = await db.collection('users').get();
//         results.forEach(result => {
//             let data = result.data();
//             if (result.id !== userId) {
//                 list.push({
//                     id: result.id,
//                     name: data.name,
//                     avatar: data.avatar
//                 })
//             }
//         })
//         return list;
//     },
//     getExistsUser: async (user, user2) => {
//         let existingUser = false;
//         let chatID = '';
//         return db.collection('users').doc(user.id).get().then((doc) => {
//             if (doc.exists) {
//                 doc.data().chats.map(chat => {
//                     if (chat.with === user2.id) {
//                         existingUser = true
//                         chatID = chat.chatId;
//                     }
//                 });
//             }
//             return existingUser;
//         }).catch((error) => {
//             return false;
//         });



//     },
//     addNewChat: async (user, user2) => {
//         let now = new Date();
//         let newChat = await db.collection('chats').add({
//             messages: firebase.firestore.FieldValue.arrayUnion({
//                 type: 'text',
//                 author: user.id,
//                 body: ' New conversation between ' + user.name + ' & ' + user2.name,
//                 date: now
//             }),
//             users: [user.id, user2.id]
//         });


//         db.collection('users').doc(user.id).update({
//             chats: firebase.firestore.FieldValue.arrayUnion({
//                 chatId: newChat.id,
//                 title: user2.name,
//                 image: user2.avatar,
//                 with: user2.id
//             })
//         });
//         db.collection('users').doc(user2.id).update({
//             chats: firebase.firestore.FieldValue.arrayUnion({
//                 chatId: newChat.id,
//                 title: user.name,
//                 image: user.avatar,
//                 with: user.id
//             })
//         });
//     },
//     onChatList: (userId, setChatList) => {
//         return db.collection('users').doc(userId).onSnapshot((doc) => {
//             if (doc.exists) {
//                 let data = doc.data();
//                 if (data.chats) {
//                     let chats = [...data.chats];
//                     chats.sort((a, b) => {
//                         if (a.lastMessageDate === undefined) {
//                             return -1;
//                         }
//                         if (b.lastMessageDate === undefined) {
//                             return -1;
//                         }
//                         if (a.lastMessageDate.seconds < b.lastMessageDate.seconds) {
//                             return 1;
//                         }
//                         else {
//                             return -1;
//                         }
//                     })
//                     setChatList(chats);
//                 }
//             }
//         });
//     },
//     onChatContent: (chatId, setMessageList, setUsers) => {
//         return db.collection('chats').doc(chatId).onSnapshot((doc) => {
//             if (doc.exists) {
//                 let data = doc.data();
//                 setMessageList(data.messages);
//                 setUsers(data.users);
//             }
//         })
//     },
//     getLoggedUser: async (token) => {
//         let u = await db.collection('users').doc(token).get();
//         if (u.data() !== null) return (u.data())
//         else{return null}


//     },
//     sendMessage: async (chatData, userId, type, body, users) => {
//         let now = new Date();
//         db.collection('chats').doc(chatData.chatId).update({
//             messages: firebase.firestore.FieldValue.arrayUnion({
//                 type,
//                 author: userId,
//                 body,
//                 date: now
//             })
//         })
//         for (let i in users) {
//             let u = await db.collection('users').doc(users[i]).get();
//             let uData = u.data();
//             if (uData.chats) {
//                 let chats = [...uData.chats];
//                 for (let e in chats) {
//                     if (chats[e].chatId == chatData.chatId) {
//                         chats[e].lastMessage = body;
//                         chats[e].lastMessageDate = now;
//                     }
//                 }
//                 await db.collection('users').doc(users[i]).update({
//                     chats
//                 })
//             }
//         }
//     }
// }