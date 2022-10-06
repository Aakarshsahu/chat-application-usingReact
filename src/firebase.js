// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC3rsBXkeHqKbAWxiBOj1uwqv6VzM2GL0E",
    authDomain: "chat-application-e06b4.firebaseapp.com",
    projectId: "chat-application-e06b4",
    storageBucket: "chat-application-e06b4.appspot.com",
    messagingSenderId: "1025564280766",
    appId: "1:1025564280766:web:6934f72c8c69b569a01bef"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);