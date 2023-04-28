// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// https://firebase.google.com/docs/web/setup#available-libraries

// Web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSyCMC5eKKjGrRLBDeRisTF0mjEJ3yjWU",
  authDomain: "a-plus-on-the-way.firebaseapp.com",
  projectId: "a-plus-on-the-way",
  storageBucket: "a-plus-on-the-way.appspot.com",
  messagingSenderId: "989209529239",
  appId: "1:989209529239:web:f30f0cb7121856eefe92d2",
  measurementId: "G-96V8QQDY8K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
