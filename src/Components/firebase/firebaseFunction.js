/* eslint-disable no-console */
import {
  collection, doc, setDoc, getDoc
} from 'firebase/firestore';
import { db, auth ,provider} from '../../firebaseConfig';
import { signInWithPopup, signInWithEmailAndPassword ,signOut, createUserWithEmailAndPassword} from 'firebase/auth';


const addHackathon = async (hackathon) => {
  try {
    const hackathonRef = doc(collection(db, 'hackathons'), hackathon.id);
    await setDoc(hackathonRef, hackathon);
  } catch (error) {
    console.error('Error adding hackathon: ', error);
  }
};

const createUserWithEmailAndPasswordFunction = async (
  email,
  password,
  username,
  role,
  profile,
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const { user } = userCredential;

    const userData = {
      uid: user.uid,
      email,
      username,
      role,
      profile,
    };

    const userRef = doc(collection(db, 'users'), email);
    await setDoc(userRef, userData);

    console.log('User created successfully');
  } catch (error) {
    console.error('Error creating user: ', error);
  }
};

const signInWithEmailAndPasswordFunction = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(`Error signing in: ${errorCode} - ${errorMessage}`);
    return null;
  }
};

const signInWithGoogleFunction = async () => {
  signInWithPopup(auth, provider).then((result) => {
    const credential = provider.credentialFromResult(result);
    // The signed-in user info.
    const user = credential.user;
    if (user){
      console.log('user exist');
    }else{
      console.log('user not exist');
    }
    return user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    console.log('sign in with google function',error);
    // ...
  });

};

const signOutFunction = () => 
  signOut(auth).then(() => {
  console.log("signout successfully")
}).catch((error) => {
  console.error('Error signing out', error);
}) 


const getUser = async (email) => {
  try {
    const userRef = doc(collection(db, 'users'), email);
    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists) {
      console.error(`User with email '${email}' not found`);
      return null;
    }
    const userData = userSnapshot.data();
    return { ...userData, email };
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

const getHackathon = async (hackathonId) => {
  try {
    const hackathonRef = doc(collection(db, 'hackathons'), hackathonId);
    const hackathonSnapshot = await getDoc(hackathonRef);

    if (!hackathonSnapshot.exists) {
      console.error(`Hackathon with ID '${hackathonId}' not found`);
      return null;
    }

    const hackathonData = hackathonSnapshot.data();
    return { ...hackathonData, id: hackathonId };
  } catch (error) {
    console.error('Error getting hackathon data:', error);
    return null;
  }
};

export {
  addHackathon,
  createUserWithEmailAndPasswordFunction,
  signInWithGoogleFunction,
  signInWithEmailAndPasswordFunction,
  signOutFunction,
  getUser,
  getHackathon,
};
