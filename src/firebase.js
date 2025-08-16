// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHL-uees251nDqI7DRRNZ1aa77_q9bU7c",
  authDomain: "ai-interview-simulator-9ac3d.firebaseapp.com",
  projectId: "ai-interview-simulator-9ac3d",
  storageBucket: "ai-interview-simulator-9ac3d.firebasestorage.app",
  messagingSenderId: "447416138423",
  appId: "1:447416138423:web:22742c23fc79ed5b9dab32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
