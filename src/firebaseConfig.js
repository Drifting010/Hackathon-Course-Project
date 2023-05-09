import * as firebase from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage, ref } from "firebase/storage";


// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDSyCMC5eKKjGrRLBDeRisTF0mjEJ3yjWU',
  authDomain: 'a-plus-on-the-way.firebaseapp.com',
  projectId: 'a-plus-on-the-way',
  storageBucket: 'a-plus-on-the-way.appspot.com',
  messagingSenderId: '989209529239',
  appId: '1:989209529239:web:f30f0cb7121856eefe92d2',
  measurementId: 'G-96V8QQDY8K',
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);
const storageRef = ref(storage);
export { app, db, auth, provider, storage, storageRef};
