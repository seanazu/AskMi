// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBC5-LcGVPTTzP9_hieyGbBSfs_hhgeH9g",
  authDomain: "askmi-84603.firebaseapp.com",
  projectId: "askmi-84603",
  storageBucket: "askmi-84603.appspot.com",
  messagingSenderId: "921923589580",
  appId: "1:921923589580:web:b66a8d5a08f7f9263a3969",
  measurementId: "G-Q65RED42EK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)