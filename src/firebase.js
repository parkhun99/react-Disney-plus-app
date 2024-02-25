// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9YzLL9bZv6qTntf2lr1yKehT2uT0dZ_c",
  authDomain: "react-disney-plus-app-d2cb9.firebaseapp.com",
  projectId: "react-disney-plus-app-d2cb9",
  storageBucket: "react-disney-plus-app-d2cb9.appspot.com",
  messagingSenderId: "41391711192",
  appId: "1:41391711192:web:9b65ac4811de722320c8ad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;