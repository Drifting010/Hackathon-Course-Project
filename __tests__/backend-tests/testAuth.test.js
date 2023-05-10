import {
  createUserWithEmailAndPasswordFunction,
  //signInWithGoogleFunction,
  signInWithEmailAndPasswordFunction,
  signOutFunction,
  getUser,
  // sendEmailVerification,
} from "../../src/Components/firebase/firebaseFunction";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from '../../src/firebaseConfig';

/// Replace this with your Firebase mocks or test Firebase instance
const testAuth = getAuth();
app;

// Test createUserWithEmailAndPassword
test("create user with email and password", async () => {
  const email = "test@example.com";
  const password = "testpassword";
  const role = "host";
  const profile = {
    user: email,
    Country: 'China',
    Description: 'pretend this is a description',
    Tags: ['tag1', 'tag2', 'tag3'],
    userIcon: 'gs://a-plus-on-the-way.appspot.com/userIcons/icon.jpeg',
    username: 'Cur'
  };

  // Call the createUserWithEmailAndPassword function
  await createUserWithEmailAndPasswordFunction(
    email,
    password,
    role,
  );
  const user = await getUser(email);
  console.log('This is the user data', user);

  // Verify that the user was created
  expect(user).not.toBeNull();

  // Get the user data from Firestore
  const userData = await getUser(user.email);

  // Verify that the user data is correct
  expect(userData.uid).toEqual(user.uid);
  await signOutFunction();
});

// This may get tested after the SignUp page get created
// // Test signInWithGoogle
// test("sign in with Google", async () => {
//   // Call the signInWithGoogle function
//   const user = await signInWithGoogleFunction();

//   // Verify that the user was signed in
//   expect(user).not.toBeNull();

//   // Get the user data from Firestore
//   const userData = await getUser(user.email);

//   // Verify that the user data is correct
//   expect(userData).toEqual(user);

//   // Sign out the user
//   await signOut(testAuth);
// });

// Test signInWithEmailAndPassword
// Test signInWithEmailAndPassword
test("sign in with email and password and sign out", async () => {
  const email = "testSignIn@example.com";
  const password = "testpassword";
  const role = "participant";
  const profile = {
    user: email,
    Country: 'China',
    Description: 'pretend this is a description',
    Tags: ['tag1', 'tag2', 'tag3'],
    userIcon: 'gs://a-plus-on-the-way.appspot.com/userIcons/icon.jpeg',
    username: 'Zuoyou'
  };

  await createUserWithEmailAndPasswordFunction(
    email,
    password,
    role,
  );

  // Call the signInWithEmailAndPassword function
  await signInWithEmailAndPasswordFunction(email, password);

  let unsubscribe;

  try {
    // Verify that the user was created
    const userCreated = await new Promise((resolve) => {
      unsubscribe = onAuthStateChanged(testAuth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          resolve(user);
        } else {
          // User is signed out
          resolve(null);
        }
      });
    });

    expect(userCreated).not.toBeNull();

    // Get the user data from Firestore
    const userData = await getUser(userCreated.email);

    // Verify that the user data is correct
    expect(userData.email).toEqual(userCreated.email);

    // Sign out the user
    await signOutFunction();
  } finally {
    if (unsubscribe) {
      unsubscribe();
    }
  }
});


// Test signUserOut
test("sign out user", async () => {
  // Create and sign in the user first
  const email = "testSignOut@example.com";
  const password = "testpassword";
  const role = "host";
  const profile = {
    user: email,
    Country: 'China',
    Description: 'pretend this is a description',
    Tags: ['tag1', 'tag2', 'tag3'],
    userIcon: 'gs://a-plus-on-the-way.appspot.com/userIcons/icon.jpeg',
    username: 'Maer'
  };

  const newUser = await createUserWithEmailAndPasswordFunction(
    email,
    password,
    role,
  );

  // Verify that the user was created
  expect(newUser).not.toBeNull();

  // Sign in the user
  const user = await signInWithEmailAndPasswordFunction(email, password);

  // Verify that the user was signed in
  expect(user).not.toBeNull();

  // Sign out the user
  await signOutFunction();

  // Verify that the user was signed out
  const currentUser = testAuth.currentUser;
  expect(currentUser).toBeNull();
});


