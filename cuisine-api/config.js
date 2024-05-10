import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "cuisine-6a46c.firebaseapp.com",
    projectId: "cuisine-6a46c",
    storageBucket: "cuisine-6a46c.appspot.com",
    messagingSenderId: "593346481335",
    appId: "1:593346481335:web:386e4cd624ddb4ba845132",
    measurementId: "G-0S6M7WLWCR"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const User = collection(db, "Users");

export default User;
