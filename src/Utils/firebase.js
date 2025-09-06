// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwQB7UPaaHEgKEZz393GvRtbNkhI1FMeQ",
  authDomain: "medical-cc7b2.firebaseapp.com",
  projectId: "medical-cc7b2",
  storageBucket: "medical-cc7b2.firebasestorage.app",
  messagingSenderId: "504733715172",
  appId: "1:504733715172:web:5b86d0df834aa7a638faf1",
  measurementId: "G-ZJE2KWCBNC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
