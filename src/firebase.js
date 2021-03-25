// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyA6_gYmU9jBG8V6-RZZV3YpRVljniaHBMQ",
  authDomain: "agrolanka-chat.firebaseapp.com",
  projectId: "agrolanka-chat",
  storageBucket: "agrolanka-chat.appspot.com",
  messagingSenderId: "516555082210",
  appId: "1:516555082210:web:d8dd3b17c6d15fa285d1bb",
  measurementId: "G-6KC6J06MTN"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;