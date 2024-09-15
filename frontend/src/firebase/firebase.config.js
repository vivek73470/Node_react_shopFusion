// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCghMOlx47Gi9SDDPLNFTGR1Y7v9DabQeQ",
  authDomain: "topshop-72b43.firebaseapp.com",
  projectId: "topshop-72b43",
  storageBucket: "topshop-72b43.appspot.com",
  messagingSenderId: "260618039959",
  appId: "1:260618039959:web:f1740a010a8ac89aa3afd2",
  measurementId: "G-SL5XF5SBE4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {auth,provider}
