// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZDyJuVVO8fXQXwPLsVvJDJ_7YQBZ9wEQ",
  authDomain: "projeto-front-728a2.firebaseapp.com",
  projectId: "projeto-front-728a2",
  storageBucket: "projeto-front-728a2.firebasestorage.app",
  messagingSenderId: "722441414954",
  appId: "1:722441414954:web:05297f0acf5f0379691653",
  measurementId: "G-C83EMHNJ3W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
