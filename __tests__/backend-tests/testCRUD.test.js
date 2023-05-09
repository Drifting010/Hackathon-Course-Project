import {
  addHackathon,
  // signInWithGoogleFunction,
  getUser,
  getHackathon,
  getAllDocumentations,
  getDocumentInCollectionById,
  getMultipleDocuments,
  getHackathonByTag,
  getCurrentUser,
  addToArray,
  removeFromArray,
  getUserProfile,
} from "../../src/Components/firebase/firebaseFunction";

import { app, auth } from '../../src/firebaseConfig';
app;
const testAuth = auth;
// Test getAllDocumentations
test('retrieve all documentaion correctly', async () => {
  // Add mock data to the collection
  const hackathonCollection = 'hackathons';

  // Call the getAllHackathons function
  const result = await getAllDocumentations(hackathonCollection);

  // Check if the result contains the correct data
  expect(result.length).not.toEqual(0);
});

// Test getDocumentInCollectionById
test("get document in collection by id", async () => {
  // Create a test collection and a sample document
  const testCollection = "users";
  const testId =  "testHost@example.com";

  // Call the getDocumentInCollectionById function with the testCollection and sampleDoc.id
  const documentData = await getDocumentInCollectionById(testCollection, testId);
  // Verify that the document data is correct
  expect(documentData.email).toEqual(testId);
});

// Test getMultipleDocuments
test("retrieve multiple documents based on condition", async () => {
  // Add sample data to the collection
  const testCollection = "users";
  const testRole = "host";

  // You may need to set up some test data in the "users" collection with role "host" before running the test

  // Call the getMultipleDocuments function with the testCollection and the conditions
  const documents = await getMultipleDocuments(testCollection, "role", "==", testRole);

  // Check if the documents meet the conditions
  expect(documents.docs.length).toBeGreaterThan(0);
  documents.docs.forEach((doc) => {
    expect(doc.data().role).toEqual(testRole);
  });
});