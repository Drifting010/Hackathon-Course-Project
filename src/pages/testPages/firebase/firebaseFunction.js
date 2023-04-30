/* eslint-disable no-console */
import {
  collection, doc, setDoc, getDoc,
} from 'firebase/firestore';
import { db, auth } from '../../../firebaseConfig';

const addUser = async (user) => {
  try {
    const userRef = doc(collection(db, 'users'), user.uid);
    await setDoc(userRef, user);
  } catch (error) {
    console.error('Error adding user: ', error);
  }
};

const addHackathon = async (hackathon) => {
  try {
    const hackathonRef = doc(collection(db, 'hackathons'), hackathon.id);
    await setDoc(hackathonRef, hackathon);
  } catch (error) {
    console.error('Error adding hackathon: ', error);
  }
};

const createUserWithEmailAndPassword = async (
  email,
  password,
  username,
  role,
  profile,
) => {
  try {
    const result = await auth.createUserWithEmailAndPassword(email, password);
    const user = {
      uid: result.user.uid,
      email,
      username,
      role,
      profile,
    };
    const userRef = doc(collection(db, 'users'), user.uid);
    await setDoc(userRef, user);
  } catch (error) {
    console.error('Error creating user: ', error);
  }
};

const getUser = async (uid) => {
  try {
    const userRef = doc(collection(db, 'users'), uid);
    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists) {
      console.error(`User with ID '${uid}' not found`);
      return null;
    }

    const userData = userSnapshot.data();
    return { ...userData, uid };
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
  addUser,
  addHackathon,
  createUserWithEmailAndPassword,
  getUser,
  getHackathon,
};
