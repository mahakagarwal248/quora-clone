import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCjvFjasABg03h8J4GR3qL-btJcHAXe25U",
    authDomain: "quoraclone-c9aa3.firebaseapp.com",
    projectId: "quoraclone-c9aa3",
    storageBucket: "quoraclone-c9aa3.appspot.com",
    messagingSenderId: "86428795629",
    appId: "1:86428795629:web:cb24d19cf5e0c1de8682e4",
    measurementId: "G-4LCSCWTN2H"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig)

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

const db = firebaseApp.firestore();

export {auth, provider};
export default db;