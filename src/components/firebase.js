
// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDVuPqi-qmRcU12w-FjJ9d4oCnpcnsXbGo",
    authDomain: "my-first-a565e.firebaseapp.com",
    projectId: "my-first-a565e",
    storageBucket: "my-first-a565e.appspot.com",
    messagingSenderId: "50196987587",
    appId: "1:50196987587:web:2641252677deba34722c76",
    measurementId: "G-ZFN7TK68ZH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth };






