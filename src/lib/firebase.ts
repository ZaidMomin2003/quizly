// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9eZSZY0UR6FRnTnMkyjPf9WNzDaX-Xik",
  authDomain: "quizlyai.firebaseapp.com",
  projectId: "quizlyai",
  storageBucket: "quizlyai.firebasestorage.app",
  messagingSenderId: "439047714483",
  appId: "1:439047714483:web:e02314eff002ab290aa2c6"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
