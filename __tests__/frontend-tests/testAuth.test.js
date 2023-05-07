import {
  createUserWithEmailAndPasswordFunction,
  signInWithGoogleFunction,
  signInWithEmailAndPasswordFunction,
  signOutFunction,
  getUser,
  getAllDocumentations,
  app,
} from "../../src/Components/firebase/firebaseFunction";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../../src/firebaseConfig";

/// Replace this with your Firebase mocks or test Firebase instance
const testAuth = getAuth();
app;
// Test createUserWithEmailAndPassword
test("create user with email and password", async () => {
  const email = "test@example.com";
  const password = "testpassword";
  const username = "TestUser";
  const role = "user";
  const profile = "https://example.com/profile.jpg";

  // Call the createUserWithEmailAndPassword function
  await createUserWithEmailAndPasswordFunction(
    email,
    password,
    username,
    role,
    profile
  );
  const user = await getUser(email);

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
test("sign in with email and password and sign out", async () => {
  const username = "TestUser";
  const role = "user";
  const profile = "https://example.com/profile.jpg";
  const email = "testSignIn@example.com";
  const password = "testpassword";

  await createUserWithEmailAndPasswordFunction(
    email,
    password,
    username,
    role,
    profile
  );

  // Call the signInWithEmailAndPassword function
  await signInWithEmailAndPasswordFunction(email, password);

  // Verify that the user was created
  const userCreated = await new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(testAuth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        resolve(user);
      } else {
        // User is signed out
        resolve(null);
      }
    });

    // Cleanup the listener when the test is done
    afterEach(() => {
      unsubscribe();
    });
  });

  console.log(userCreated);
  expect(userCreated).not.toBeNull();

  // Get the user data from Firestore
  const userData = await getUser(userCreated.email);

  // Verify that the user data is correct
  expect(userData.email).toEqual(userCreated.email);

  // Sign out the user
  await signOutFunction();
});

// Test signUserOut
test("sign out user", async () => {
  // Create and sign in the user first
  const email = "testSignOut@example.com";
  const password = "testpassword";
  const username = "TestUser";
  const role = "user";
  const profile = "https://example.com/profile.jpg";

  const newUser = await createUserWithEmailAndPasswordFunction(
    email,
    password,
    username,
    role,
    profile
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

// Test getAllDocumentations
test('retrieve all documentaion correctly', async () => {
  // Add mock data to the collection
  const hackathonCollection = 'hackathons';

  // Call the getAllHackathons function
  const result = await getAllDocumentations(hackathonCollection);

  // Check if the result contains the correct data
  expect(result.length).not.toBeNull;
});