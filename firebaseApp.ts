// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABjP78C8Jde6DUnSSbPKihBs3Yy9iia8E",
  authDomain: "ecommerce-clothes-c558f.firebaseapp.com",
  projectId: "ecommerce-clothes-c558f",
  storageBucket: "ecommerce-clothes-c558f.appspot.com",
  messagingSenderId: "302086656277",
  appId: "1:302086656277:web:e56ab938151111d60f591c",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
export default app;
