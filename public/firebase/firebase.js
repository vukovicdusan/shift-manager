import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  // apiKey: process.env.FIREBASE_API,
  apiKey: "AIzaSyDQZajD_Qe3UTX1v03JulSbH9SSNAiA-vI",
  authDomain: "shift-manager-1e9d2.firebaseapp.com",
  projectId: "shift-manager-1e9d2",
  storageBucket: "shift-manager-1e9d2.appspot.com",
  messagingSenderId: "85193443735",
  appId: "1:85193443735:web:9d9cdfffa739a49de21cd2",
  measurementId: "G-9WJB2N6T4V",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
