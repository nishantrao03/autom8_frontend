// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5WkdqDxJc3ZkRWjK_qQrV2qOxm3CF1wE",
  authDomain: "autom8-app.firebaseapp.com",
  projectId: "autom8-app",
  storageBucket: "autom8-app.firebasestorage.app",
  messagingSenderId: "185124421343",
  appId: "1:185124421343:web:6e518367a4405050fa336a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
