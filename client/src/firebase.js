// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-app-522b1.firebaseapp.com",
  projectId: "mern-blog-app-522b1",
  storageBucket: "mern-blog-app-522b1.appspot.com",
  messagingSenderId: "921333982299",
  appId: "1:921333982299:web:5c364646a465c3b6fecb7e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);