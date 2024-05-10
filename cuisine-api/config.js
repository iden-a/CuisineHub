// import firebase from 'firebase';

// firebaseConfig = {
//     apiKey: "AIzaSyAAHXU2UdFON7904cYqYg01PRLgGoPe59o",
//     authDomain: "cuisine-6a46c.firebaseapp.com",
//     projectId: "cuisine-6a46c",
//     storageBucket: "cuisine-6a46c.appspot.com",
//     messagingSenderId: "593346481335",
//     appId: "1:593346481335:web:386e4cd624ddb4ba845132",
//     measurementId: "G-0S6M7WLWCR"
//   };

//   firebase.initializeApp(firebaseConfig);
//   const db=firebase.firestore();
//   const User=db.collection("Users")
//   module.exports = User;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAAHXU2UdFON7904cYqYg01PRLgGoPe59o", // switch to env variable
    authDomain: "cuisine-6a46c.firebaseapp.com",
    projectId: "cuisine-6a46c",
    storageBucket: "cuisine-6a46c.appspot.com",
    messagingSenderId: "593346481335",
    appId: "1:593346481335:web:386e4cd624ddb4ba845132",
    measurementId: "G-0S6M7WLWCR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the Firestore service
const db = getFirestore(app);

// Get a reference to the Users collection
const User = collection(db, "Users");

// If you need to export Users, consider using export instead of module.exports
export default User;
