/* eslint-disable no-console */
import {
  collection, doc, setDoc, getDoc, getDocs, query, where, collectionGroup, arrayUnion, arrayRemove,
} from 'firebase/firestore';
import { db, auth, storage } from '../../firebaseConfig';
import {  ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import { //signInWithPopup,
   signInWithEmailAndPassword ,signOut, createUserWithEmailAndPassword,updateProfile} from 'firebase/auth';

//CRUD Operations
//Automatically add a new item to array field
const addToArray = async (collectionName, documentName, fieldName, dataToAdd ) => { 
  const ref = doc(db, collectionName, documentName);

  await updateDoc(ref, {
    [fieldName]: arrayUnion(dataToAdd),
  });
};

const removeFromArray = async(collectionName, documentName, fieldName, dataToAdd) => {
  const ref = doc(db, collectionName, documentName);

  await updateDoc(ref, {
    [fieldName]: arrayRemove(dataToRemove),
  })
};

const getDocumentByRef = async (ref) => {
  const snapshot = await (getDoc(ref));
  if (snapshot.exists()) {
    const document = snapshot.data();
    console.log(document);
    return document;
  }else{
    console.log('No such document');
  }
}

// Get hackathon data from the 'hackathons' collection by hackathon ID
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

//Get all documentations of one collection
const getAllDocumentations = async (collectionName) => {
  try{
    const querySnapshot = await getDocs(collection(db, collectionName));
    const documentations = querySnapshot.docs;
    return documentations;
  }catch (error){
    console.error('Error getting all documentations', error);
  }
  
};

//Get the document by specify the id
const getDocumentInCollectionById = async (collectionName, documentId) => {
  try {
    const docRef = doc (db, collectionName, documentId);
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
const getMultipleDocuments = async (collectionName,condition1, operator, condition2) => {
  try {
    const q = query(collection(db, collectionName), where (condition1,operator,condition2));

    const querySnapshot = await getDocs(q);
    return querySnapshot;
  }catch (error) {
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
      queryRef = query(hackathonsRef, where("tag", "==", filters.tag),where("status", "==", filters.status));
    } else if (filters.tag !== null && filters.status === null) {
      queryRef = query(hackathonsRef, where("tag", "==", filters.tag));
    } else if (filters.tag === null && filters.status !== null){
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


// CRUD Operatiosn
// Add a new hackathon to the 'hackathons' collection
const addHackathon = async (hackathon) => {
  try {
    const hackathonRef = doc(collection(db, 'hackathons'), hackathon.id);
    await setDoc(hackathonRef, hackathon);
  } catch (error) {
    console.error('Error adding hackathon: ', error);
  }
};

const updateHackathon = async (hackathon) => {

}


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
    updateProfile(getCurrentUser(), {photoURL});
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
    const xhr =new XMLHttpRequest();
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

const sendEmailVerification = async () => {
  const user = getCurrentUser();
  if (user != null){
    sendEmailVerification(user)
      .then(() => {
        console.log('email Verification sent');
      })
  } else{
    console.log('Something went wrong');
  }
}

//get user profile with giving email
const getUserProfile = async (email) => {
  const user = getUser(email);
  
  console.log('this is the user', user);
  const profileRef = user.profile;
  const profile = await getDoc(profileRef);
  console.log(profile, profileRef);
  return [profile]; 
}



// Create a new user with email and password authentication and store their data in the 'users' collection
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
const signOutFunction = () =>
  signOut(auth).then(() => {
    console.log("signout successfully")
  }).catch((error) => {
    console.error('Error signing out', error);
  })

// Get user data from the 'users' collection by email
const getUser = async (email) => {
  try {
    const userRef = doc(collection(db, 'users'), email);
    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists) {
      console.error(`User with email '${email}' not found`);
      return null;
    }
    const userData = userSnapshot.data();
    console.log('This is userData ', userData)
    return { ...userData, email };
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};


export {
  addHackathon,
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
  uploadIcon,
  getCurrentUser,
  uploadFile,
  downLoadFile,
  setRef,
  addToArray,
  removeFromArray,
  sendEmailVerification,
  getDocumentByRef,
  getUserProfile,
};