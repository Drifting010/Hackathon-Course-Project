/* eslint-disable no-console */
import {
  collection, doc, setDoc, getDoc, getDocs, query, where, arrayUnion, arrayRemove, updateDoc, deleteDoc

} from 'firebase/firestore';
import { db, auth, storage } from '../../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { //signInWithPopup,
  signInWithEmailAndPassword, signOut, updatePassword, createUserWithEmailAndPassword, updateProfile
} from 'firebase/auth';

//CRUD Operations
//Automatically add a new item to array field
const addToArray = async (collectionName, documentName, fieldName, dataToAdd) => {
  const ref = doc(db, collectionName, documentName);

  await updateDoc(ref, {
    [fieldName]: arrayUnion(dataToAdd),
  });
};

//Automatically remove a item from array field
const removeFromArray = async(collectionName, documentName, fieldName, dataToRemove) => {
  const ref = doc(db, collectionName, documentName);


  await updateDoc(ref, {
    [fieldName]: arrayRemove(dataToRemove),
  })
};

const getDocumentByRef = async (ref) => {
  const snapshot = await (getDoc(ref));
  if (snapshot.exists()) {
    const document = snapshot.data();
    return document;
  } else {
    console.log('No such document');
  }
}

// Get hackathon data from the 'hackathons' collection by hackathon ID
const getHackathon = async (hackathonId) => {
  try {
    const hackathonRef = doc(collection(db, 'hackathons'), hackathonId);
    const hackathonSnapshot = await getDoc(hackathonRef);
    if (!hackathonSnapshot.exists() || !hackathonSnapshot.data()) {
      console.error(`Hackathon with ID '${hackathonId}' not found or is empty`);
      return null;
    }

    const hackathonData = hackathonSnapshot.data();
    return { ...hackathonData, id: hackathonId };
  } catch (error) {
    console.error('Error getting hackathon data:', error);
    return null;
  }
};

// Get hackathon data and participants from the 'hackathons' collection by hackathon ID
const getHackathonAndParticipants = async (hackathonId) => {
  try {
    const hackathonRef = doc(db, 'hackathons', hackathonId);
    const hackathonSnapshot = await getDoc(hackathonRef);

    if (!hackathonSnapshot.exists) {
      console.error(`Hackathon with ID '${hackathonId}' not found`);
      return null;
    }

    const hackathonData = hackathonSnapshot.data();

    // Get the participants of the hackathon
    const participantsCollectionRef = collection(hackathonRef, 'participants');
    const participantsSnapshot = await getDocs(participantsCollectionRef);
    const participantsData = participantsSnapshot.docs.map(doc => doc.data());

    return { ...hackathonData, id: hackathonId, participants: participantsData };
  } catch (error) {
    console.error('Error getting hackathon data:', error);
    return null;
  }
};


//Get all documentations of one collection
const getAllDocumentations = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const documentations = querySnapshot.docs;
    return documentations;
  } catch (error) {
    console.error('Error getting all documentations', error);
  }
};

//Get the document by specify the id
const getDocumentInCollectionById = async (collectionName, documentId) => {
  try {
    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document data', docSnap.data());
      return docSnap.data();
    }
  } catch (error) {
    console.error('Error fetching document', error);
    return null;
  }
};

//Get documents which match query in one collection
const getMultipleDocuments = async (collectionName, condition1, operator, condition2) => {
  try {
    const q = query(collection(db, collectionName), where(condition1, operator, condition2));

    const querySnapshot = await getDocs(q);
    return querySnapshot;
  } catch (error) {
    console.error('Error fetching document', error);
    return null;
  }
};

// get hackathons by Tag
const getHackathonByTag = async (filters) => {
  try {
    const hackathonsRef = collection(db, "hackathons");
    let queryRef = query(hackathonsRef);
    if ((filters.tag !== null) && (filters.status !== null)) {
      queryRef = query(hackathonsRef, where("tag", "==", filters.tag), where("status", "==", filters.status));
    } else if (filters.tag !== null && filters.status === null) {
      queryRef = query(hackathonsRef, where("tag", "==", filters.tag));
    } else if (filters.tag === null && filters.status !== null) {
      queryRef = query(hackathonsRef, where("status", "==", filters.status));
    }
    const querySnapshot = await getDocs(queryRef);
    const hackathons = [];
    querySnapshot.forEach((doc) => {
      hackathons.push({ id: doc.id, ...doc.data() });
    });
    return hackathons;
  } catch (error) {
    console.error('Error getting hackathons by tag: ', error);
  }
};

// get hackathons by filter by host
const getHackathonByFilterByHost = async (filters) => {
  try {
    const hackathonsRef = collection(db, "hackathons");
    let queryRef = query(hackathonsRef);
    // find by tag + status
    if ((filters.tag !== null) && (filters.status !== null)) {
      queryRef = query(
        hackathonsRef, 
        where("tag", "==", filters.tag),
        where("status", "==", filters.status),
        where("host", "==", filters.username)
        );
    // find by tag
    } else if (filters.tag !== null && filters.status === null) {
      queryRef = query(
        hackathonsRef, 
        where("tag", "==", filters.tag),
        where("host", "==", filters.username)
        );
    // find by status
    } else if (filters.tag === null && filters.status !== null){
      queryRef = query(
        hackathonsRef, 
        where("status", "==", filters.status),
        where("host", "==", filters.username)
        );
    }
    // other
    else {
      queryRef = query(
        hackathonsRef, 
        where("host", "==", filters.username)
        );
    }
    const querySnapshot = await getDocs(queryRef);
    const hackathons = [];
    querySnapshot.forEach((doc) => {
      hackathons.push({ id: doc.id, ...doc.data() });
    });
    // console.log('hackathons:',hackathons);
    return hackathons;
  } catch (error) {
    console.error('Error getting hackathons by tag: ', error);
  }
};

// get hackathons by filter by participant
const getHackathonByFilterByParticipant = async (filters) => {
  try {
    const hackathonsRef = collection(db, "hackathons");
    let queryRef = query(hackathonsRef);
    // find by tag + status
    if ((filters.tag !== null) && (filters.status !== null)) {
      queryRef = query(
        hackathonsRef, 
        where("tag", "==", filters.tag),
        where("status", "==", filters.status),
        where("members", "array-contains", filters.username)
        );
    // find by tag
    } else if (filters.tag !== null && filters.status === null) {
      queryRef = query(
        hackathonsRef, 
        where("tag", "==", filters.tag),
        where("members", "array-contains", filters.username)
        );
    // find by status
    } else if (filters.tag === null && filters.status !== null){
      queryRef = query(
        hackathonsRef, 
        where("status", "==", filters.status),
        where("members", "array-contains", filters.username)
        );
    }
    // other
    else {
      queryRef = query(
        hackathonsRef, 
        where("members", "array-contains", filters.username)
        );
    }
    const querySnapshot = await getDocs(queryRef);
    const hackathons = [];
    querySnapshot.forEach((doc) => {
      hackathons.push({ id: doc.id, ...doc.data() });
    });
    // console.log('hackathons:',hackathons);
    return hackathons;
  } catch (error) {
    console.error('Error getting hackathons by tag: ', error);
  }
};

// get hackathons for explore page
// get hackathons by filter by participant
const getHackathonByFilterExplore = async (filters) => {
  try {
    const hackathonsRef = collection(db, "hackathons");
    let queryRef = query(hackathonsRef);
    console.log('filters.username: ',filters.username)
    // find by tag + status
    if ((filters.tag !== null) && (filters.status !== null)) {
      queryRef = query(
        hackathonsRef, 
        where("tag", "==", filters.tag),
        where("status", "==", filters.status),
        );
    // find by tag
    } else if (filters.tag !== null && filters.status === null) {
      queryRef = query(
        hackathonsRef, 
        where("tag", "==", filters.tag),
        );
    // find by status
    } else if (filters.tag === null && filters.status !== null){
      queryRef = query(
        hackathonsRef, 
        where("status", "==", filters.status),
        );
    }
    const querySnapshot = await getDocs(queryRef);
    const hackathons = [];
    querySnapshot.forEach((doc) => {
      if (!doc.data().members.includes(filters.username) )
      hackathons.push({ id: doc.id, ...doc.data() });
    });
    // console.log('hackathons:',hackathons);
    return hackathons;
  } catch (error) {
    console.error('Error getting hackathons by tag: ', error);
  }
};

//return all tags 
const getAllTags = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const documentations = querySnapshot.docs.map(doc => doc.data()['label']);
    return documentations;
  } catch (error) {
    console.error('Error getting all tags', error);
  }

};

// CRUD Operatiosn
// Add a new hackathon or Update Hackathon to the 'hackathons' collection
const addHackathon = async (hackathonData) => {
  try {
    const hackathonRef = doc(collection(db, 'hackathons'), hackathonData.id);
    await setDoc(hackathonRef, hackathonData, {merge: true});
  } catch (error) {
    console.error('Error adding hackathon: ', error);
  }
};

//add or update the particpant to hackathons
const updateParticipatedHacakthon = async (hackathonId, email) => {
  try {
    const eventRef = doc(db, 'hackathons', hackathonId, 'participants', email);
    const userRef = doc(db, 'participantProfiles', email, 'myEvents', hackathonId);
    await setDoc(eventRef, { email: email }, { merge: true });
    await setDoc(userRef, { hackathonId: hackathonId }, { merge: true })

  } catch (error) {
    console.error('Error Updating hackathon: ', error);
  }
};

//remove the particpants from the hackathon
const deleteParticipatedHacakthon = async (hackathonId, email) => {
  try {
    const eventRef = doc(db, 'hackathons', hackathonId, 'participants', email);
    const userRef = doc(db, 'participantProfiles', email, 'myEvents', hackathonId);
    await deleteDoc(eventRef);
    await deleteDoc(userRef)

  } catch (error) {
    console.error('Error deleting hackathon: ', error);
  }
};

//General add sub collection documentation
const addDocumentToSubCollection = async (collectionName, documentId, subCollectionName, nestedDocumentId, data) => {
  try {
    const mainDocRef = doc(db, collectionName, documentId);
    await setDoc(mainDocRef, {}, { merge: true })
    const subCollectionRef = collection(mainDocRef, subCollectionName);
    const nestedDocRef = doc(subCollectionRef, nestedDocumentId);
    await setDoc(nestedDocRef, data, { merge: true });
  } catch (error) {
    console.error('Error add subCollection');
  }
}

//general remove document from the subcollection
const deleteDocumentFromSubCollection = async (collectionName, documentId, subCollectionName, nestedDocumentId) => {
  try {
    const documentRef = doc(db, collectionName, documentId, subCollectionName, nestedDocumentId);
    await deleteDoc(documentRef);
  } catch (error) {
    console.error('Error delete subCollection');
  }
};

//update document from the subcollelction
const updateDocumentFromSubCollection = async (collectionName, documentId, subCollectionName, nestedDocumentId, data) => {
  try {
    const documentRef = doc(db, collectionName, documentId, subCollectionName, nestedDocumentId);
    await updateDoc(documentRef, data);
  } catch (error) {
    console.error('Error updating subCollection');
  }
};

//Set Winner similar cause can use this as an example
//Add single user to winner, with price
const setWinner = async (hackathonId, email, data) => {
  try{
    await addDocumentToSubCollection('hackathons', hackathonId, 'winners',email, data);
  } catch (error) {
    console.error('Error adding winner');
  }
};

//Retrive Registrations and submissions from hackathon
//Sub Collection Name can be anything
const retriveSubCollections = async (hackathonId, subCollectionName) => {
  try{
    const mainCollectionRef = doc(db, 'hackathons',hackathonId);
    const subCollectionRef = collection(mainCollectionRef, subCollectionName);
    const querySnapshot = await getDocs(subCollectionRef);
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });

    return querySnapshot.docs;
  } catch (error) {
    console.error(error);
  }
};


//File Transaction
//upload file onto firebase storage
const uploadIcon = async (file, userId, setLoading) => {
  const fileRef = ref(storage, 'userIcons/' + userId);

  setLoading(true);

  const snapshot = await uploadBytes(fileRef, file);

  console.log(snapshot);
  const photoURL = await getDownloadURL(fileRef)
  const currentUser = getCurrentUser();
  if (currentUser != null) {
    updateProfile(getCurrentUser(), { photoURL });
  }

  setLoading(false);
  alert("uploaded!")
  return photoURL;
}

//Upload files with given file reference in db and file
const uploadFile = async (file, fileRef) => {

  const snapshot = await uploadBytes(fileRef, file);

  console.log(snapshot);
  const downLoadURL = await getDownloadURL(fileRef)
  alert("uploaded!")
  return downLoadURL;
}

//Short cut when setting ref of storage
const setRef = async (userId, dir) => {
  const fileRef = ref(storage, dir + '/' + userId);

  return fileRef;
}

//download file from storage via given ref
const downLoadFile = (fileRef) => {
  getDownloadURL(fileRef).then((url) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
      const blob = xhr.response;
      return [event, blob];
    }
    xhr.open('GET', url);
    xhr.send();
  })
    .catch((error) => {
      console.error('error download file', error)
    })
};

//User Operations
//Get Current User
const getCurrentUser = () => {
  const user = auth.currentUser;
  if (user !== null) {
    return user;
  }
  console.error('No user signed in')
  return null;
}

//Send Email Vertificaion
const sendEmailVerification = async () => {
  const user = getCurrentUser();
  if (user != null) {
    sendEmailVerification(user)
      .then(() => {
        console.log('email Verification sent');
      })
  } else {
    console.log('Something went wrong');
  }
}

//get user profile with giving email
const getUserProfile = async (email) => {
  const user = await getUser(email);

  const profile = await getDoc(user.profile);
  console.log('Profile is', profile.data());
  return profile.data();
}

//create profiles
const createHostProfile = async (profileData) => {
  try {
    const profileRef = doc(collection(db, 'hostProfiles'), profileData.user);
    await setDoc(profileRef, profileData);
    return profileRef;
  } catch (error) {
    console.error('Error creating file', error);
  }
}

//create profile for participants
const createParticipantProfile = async (profileData) => {
  try {
    const profileRef = doc(collection(db, 'participantProfiles'), profileData.user);
    await setDoc(profileRef, profileData);
    return profileRef;
  } catch (error) {
    console.error('Error creating file', error);
  }
}


//update profile for user
const updateUserProfile = async (profileData, role) => {
  if (role == 'host') {
    await createHostProfile(profileData);
  } else {
    await createParticipantProfile(profileData);
  }
}

// Create a new user with email and password authentication and store their data in the 'users' collection
const createUserWithEmailAndPasswordFunction = async (
  email,
  password,
  role,
) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    let userData = {}; // Change this line to use let instead of const
    const authEmail = auth.currentUser.email;
    const profileData = {
      user: authEmail,
    };
    if (role === 'host') {
      const profile = await createHostProfile(profileData);
      userData = {
        authEmail,
        role: 'host',
        profile: profile,
      };
    } else {
      const profile = await createParticipantProfile(profileData);
      userData = {
        authEmail,
        role: 'participant',
        profile: profile,
      };
    }

    const userRef = doc(collection(db, 'users'), authEmail);
    await setDoc(userRef, userData);

    console.log('User created successfully');
  } catch (error) {
    console.error('Error creating user: ', error);
  }
};

// Sign in a user with their email and password
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

// // Sign in a user with their Google account
// const signInWithGoogleFunction = async () => {
//   signInWithPopup(auth, provider).then((result) => {
//     const credential = provider.credentialFromResult(result);
//     // The signed-in user info.
//     const user = credential.user;
//     if (user){
//       console.log('user exist');
//     }else{
//       console.log('user not exist');
//     }
//     return user;
//     // IdP data available using getAdditionalUserInfo(result)
//     // ...
//   }).catch((error) => {
//     // Handle Errors here.
//     console.log('sign in with google function',error);
//     // ...
//   });

// };

// Sign out the currently authenticated user
const signOutFunction = async () => {
  return signOut(auth)
    .then(() => {
      console.log("signout successfully");
    })
    .catch((error) => {
      console.error("Error signing out", error);
    });
};


//reset userPassowrd
const resetPassword = async (newPassword) => {
  const user = auth.currentUser;
  try {
  await updatePassword(user, newPassword);
  } catch(error){
    // An error ocurred
    // ...
    console.error('error resetting password', error);
  }
}


// Get user data from the 'users' collection by email
const getUser = async (email) => {
  try {
    const userRef = doc(db, 'users', email);
    const userSnapshot = await getDoc(userRef);
    console.log('get User', userSnapshot.data());
    return userSnapshot.data();
  } catch (error) {
    console.error('Error getting user data:', error);
  }
};

export {
  addHackathon,
  addDocumentToSubCollection,
  createUserWithEmailAndPasswordFunction,
  // signInWithGoogleFunction,
  signInWithEmailAndPasswordFunction,
  signOutFunction,
  getUser,
  getHackathon,
  getAllDocumentations,
  getDocumentInCollectionById,
  getMultipleDocuments,
  getHackathonByTag,
  updateParticipatedHacakthon,
  updateUserProfile,
  updateDocumentFromSubCollection,
  createHostProfile,
  createParticipantProfile,
  uploadIcon,
  getCurrentUser,
  uploadFile,
  downLoadFile,
  setRef,
  addToArray,
  removeFromArray,
  setWinner,
  retriveSubCollections,
  deleteParticipatedHacakthon,
  deleteDocumentFromSubCollection,
  sendEmailVerification,
  resetPassword,
  getDocumentByRef,
  getUserProfile,
  getAllTags,
  getHackathonByFilterByHost,
  getHackathonByFilterByParticipant,
  getHackathonAndParticipants,
  getHackathonByFilterExplore,
};