import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

  apiKey: "AIzaSyAbAzu3gIIuWqTJD3_d349L7yHt8a1y-qk",
  authDomain: "formations-29d0f.firebaseapp.com",
  projectId: "formations-29d0f",
  storageBucket: "formations-29d0f.firebasestorage.app",
  messagingSenderId: "1087624269942",
  appId: "1:1087624269942:web:6e9f219d99d9a168e7cf57"


};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);