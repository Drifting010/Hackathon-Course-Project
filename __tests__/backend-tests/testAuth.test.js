import {
  createUserWithEmailAndPasswordFunction,
  //signInWithGoogleFunction,
  signInWithEmailAndPasswordFunction,
  signOutFunction,
  getUser,
  // sendEmailVerification,
} from "../../src/Components/firebase/firebaseFunction";
import { getAuth } from "firebase/auth";
import { app } from "../../src/firebaseConfig";

/// Replace this with your Firebase mocks or test Firebase instance
const testAuth = getAuth();
app;

// Test createUserWithEmailAndPassword
test("create user with email and password", async () => {
  const email = "test@example.com";
  const password = "testpassword";
  const role = "host";

  // Call the createUserWithEmailAndPassword function
  await createUserWithEmailAndPasswordFunction(email, password, role);
  const user = await getUser(email);
  console.log("This is the user data", user);

  // Verify that the user was created
  expect(user).not.toBeNull();

  // Get the user data from Firestore
  const userData = await getUser(user.authEmail);

  // Verify that the user data is correct
  expect(userData.authEmail).toEqual(user.authEmail);
  signOutFunction();
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
  const email = "testsignin@example.com";
  const password = "testpassword";
  const role = "host";

  await createUserWithEmailAndPasswordFunction(email, password, role);

  // Call the signInWithEmailAndPassword function
  const userCreated = await signInWithEmailAndPasswordFunction(email, password);

  expect(userCreated).not.toBeNull();

  const userData = await getUser(email);

  // Verify that the user data is correct
  expect(userData.authEmail).toEqual(email);

  // Sign out the user
  signOutFunction();
});

// Test signUserOut
test("sign out user", async () => {
  // Create and sign in the user first
  const email = "testsignout@example.com";
  const password = "testpassword";
  const role = "host";

  const newUser = await createUserWithEmailAndPasswordFunction(
    email,
    password,
    role
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
