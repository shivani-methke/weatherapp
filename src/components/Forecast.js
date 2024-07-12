// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDVuPqi-qmRcU12w-FjJ9d4oCnpcnsXbGo",
    authDomain: "my-first-a565e.firebaseapp.com",
    projectId: "my-first-a565e",
    storageBucket: "my-first-a565e.appspot.com",
    messagingSenderId: "50196987587",
    appId: "1:50196987587:web:2641252677deba34722c76",
    measurementId: "G-ZFN7TK68ZH"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
