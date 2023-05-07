/* eslint-disable no-console */
import {
  collection, doc, setDoc, getDoc, addDoc
} from 'firebase/firestore';
import { db, auth } from '../../firebaseConfig';

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

/**
 * create a user with the role of participant in DB
 */
const createParticipant = async (email, password, role) => {
  try {
    const participantsCollectionRef = collection(db, 'participants');
    await addDoc(participantsCollectionRef, { email: email, password: password, role: role });
  } catch (error) {
    console.error('Error creating participant: ', error);
  }
};

/**
 * create a user with the role of host in DB
 */
const createHost = async (email, password, role) => {
  try {
    const hostCollectionRef = collection(db, 'host');
    await addDoc(hostCollectionRef, { email: email, password: password, role: role });
  } catch (error) {
    console.error('Error creating host: ', error);
  }
}

export {
  addUser,
  addHackathon,
  createUserWithEmailAndPassword,
  getUser,
  getHackathon,
  createParticipant, // Draft by Leo
  createHost // Draft by Leo
};
