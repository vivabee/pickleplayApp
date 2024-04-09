// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjGaTWgylqH-bCc3cXqxNcxdQkueCxI8Q",
  authDomain: "pickerballappdb.firebaseapp.com",
  projectId: "pickerballappdb",
  storageBucket: "pickerballappdb.appspot.com",
  messagingSenderId: "460172180908",
  appId: "1:460172180908:web:de60cfabc45de01f770e09",
  measurementId: "G-TWWDETPQXH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);