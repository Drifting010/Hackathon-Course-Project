import {
  // signInWithGoogleFunction,
  getAllDocumentations,
  getDocumentInCollectionById,
  getMultipleDocuments,
  getUser,
  getHackathon,
  getUserProfile,
  getCurrentUser,
  addToArray,
  createHostProfile,
  createParticipantProfile,
  updateUserProfile,
  removeFromArray,
  signInWithEmailAndPasswordFunction,
  updateParticipatedHacakthon,
} from "../../src/Components/firebase/firebaseFunction";
import { getDoc, doc, collection } from "firebase/firestore";
import { app, auth, db } from '../../src/firebaseConfig';
app;


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
  const testId =  "test@example.com";

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
  console.log(documents);
  // Check if the documents meet the conditions
  expect(documents.docs.length).toBeGreaterThan(0);
  documents.docs.forEach((doc) => {
    expect(doc.data().role).toEqual(testRole);
  });
});


const testEmail = 'test@example.com';
const testPassword = 'testpassword';
const testRole = 'host';
//const testProfilePath = '/hostProfiles/test@example.com';
const testUsername = 'Cur';
//const testUserIcon = 'gs://a-plus-on-the-way.appspot.com/userIcons/icon.jpeg';

//Define test data
const hackathonExample = {
  id: 'hackathonExample',
  title: 'hackathonExample',
  bannerImage: 'gs://a-plus-on-the-way.appspot.com/hackathon1/banner.jpeg',
  description: 'This is a long hackathon description',
  endDate: '28 May 2023 at 23:20:21 UTC+12',
  host: '/hosts/testHost@example.com',
  participants: ['/participants/testParticipant@example.com'],
  prizePool: '1000',
  startDate: '23 May 2023 at 04:18:53 UTC+12',
  status: 'ongoing',
  tags: [
    '/hackathonTags/Database',
    '/hackathonTags/Robotics',
    '/hackathonTags/noCode',
  ],
  RegistrationForm: {/* Collection */},
  Registrations: {/* Collection */},
  SubmissionForm: {/* Collection */},
  Submissions: {/* Collection */},
};

describe('Firebase Functions', () => {
  let currentUser;

  beforeAll(async () => {
    currentUser = await signInWithEmailAndPasswordFunction(testEmail, testPassword);
  });

  afterAll(async () => {
    await auth.signOut();
  });

  test('getUser', async () => {
    const user = await getUser(testEmail);

    expect(user).not.toBeNull();
    expect(user.email).toEqual(testEmail);
    expect(user.role).toEqual(testRole);
  });

  test('getHackathon', async () => {
    const hackathon = await getHackathon(hackathonExample.id);

    expect(hackathon).not.toBeNull();
    expect(hackathon.id).toEqual(hackathonExample.id);
    expect(hackathon.title).toEqual(hackathonExample.title);
    expect(hackathon.description).toEqual(hackathonExample.description);
    expect(hackathon.RegistrationForm).not.toBeNull;
    expect(hackathon.Registrations).not.toBeNull;
    expect(hackathon.SubmissionForm).not.toBeNull;
    expect(hackathon.Submissions).not.toBeNull;
  });

  test('getUserProfile', async () => {
    const userProfile = await getUserProfile(testEmail);
    console.log('this is the userProfile', userProfile);
    expect(userProfile).not.toBeNull();
    expect(userProfile.username).toEqual(testUsername);
  });

  test('getCurrentUser', () => {
    const user = getCurrentUser();

    expect(user).not.toBeNull();
    expect(user.email).toEqual(testEmail);
  });

  test('addToArray and removeFromArray', async () => {
    const collectionName = 'hackathons';
    const documentName = hackathonExample.id;
    const fieldName = 'tags';
    const dataToAdd = 'hackathonTags/newTag';

    await addToArray(collectionName, documentName, fieldName, dataToAdd);

    let docData = await getDocumentInCollectionById(collectionName, documentName);
    expect(docData[fieldName]).toContain(dataToAdd);

    await removeFromArray(collectionName, documentName, fieldName, dataToAdd);

    docData = await getDocumentInCollectionById(collectionName, documentName);
    expect(docData[fieldName]).not.toContain(dataToAdd);
  });

  // Test createHostProfile
test("create host profile", async () => {
  const profileData = {
    user: "testHost@example.com",
    Country: "China",
    Description: "pretend this is a description",
    Tags: ["tag1", "tag2", "tag3"],
    userIcon: "gs://a-plus-on-the-way.appspot.com/userIcons/icon.jpeg",
    username: "Cur",
  };

  const profileRef = await createHostProfile(profileData);
  expect(profileRef).not.toBeNull();

  const profileSnapshot = await getDoc(profileRef);
  expect(profileSnapshot.exists()).toBeTruthy();

  const profile = profileSnapshot.data();
  expect(profile).toEqual(profileData);
});

// Test createParticipantProfile
test("create participant profile", async () => {
  const profileData = {
    user: "testParticipant@example.com",
    Country: "China",
    Description: "pretend this is a description",
    Tags: ["tag1", "tag2", "tag3"],
    userIcon: "gs://a-plus-on-the-way.appspot.com/userIcons/icon.jpeg",
    username: "Cur",
  };

  const profileRef = await createParticipantProfile(profileData);
  expect(profileRef).not.toBeNull();

  const profileSnapshot = await getDoc(profileRef);
  expect(profileSnapshot.exists()).toBeTruthy();

  const profile = profileSnapshot.data();
  expect(profile).toEqual(profileData);
});

// Test updateUserProfile
test("update user profile", async () => {
  const intialData = {
    user: "testUpdate@example.com",
    Country: "China",
    Description: "pretend this is a description",
    Tags: ["tag1", "tag2", "tag3"],
    userIcon: "gs://a-plus-on-the-way.appspot.com/userIcons/icon.jpeg",
    username: "Cur",
  }
  const profileData = {
    user: "testUpdate@example.com",
    Country: "China",
    Description: "pretend this is a alterd description",
    Tags: ["tag1", "tag2", "tag3"],
    userIcon: "gs://a-plus-on-the-way.appspot.com/userIcons/icon.jpeg",
    username: "Cur",
  };

  await createHostProfile(intialData);
  await createParticipantProfile(intialData);
  // Update the profile for a host
  const hostRole = "host";
  await updateUserProfile(profileData, hostRole);

  const hostProfileRef = doc(collection(db, "hostProfiles"), profileData.user);
  const hostProfileSnapshot = await getDoc(hostProfileRef);
  expect(hostProfileSnapshot.exists()).toBeTruthy();

  const hostProfile = hostProfileSnapshot.data();
  expect(hostProfile).toEqual(profileData);

  // Update the profile for a participant
  const participantRole = "participant";
  await updateUserProfile(profileData, participantRole);

  const participantProfileRef = doc(
    collection(db, "participantProfiles"),
    profileData.user
  );
  const participantProfileSnapshot = await getDoc(participantProfileRef);
  expect(participantProfileSnapshot.exists()).toBeTruthy();

  const participantProfile = participantProfileSnapshot.data();
  expect(participantProfile).toEqual(profileData);
});

// Test updateParticipatedHackathon
test("update participated hackathon", async () => {
  const hackathonId = "hackathonExample";
  const userEmail = "testParticipant@example.com";

  // Make sure the user exists in the database before running the test
  const user = await getUser(userEmail);
  expect(user).not.toBeNull();

  // Call the updateParticipatedHackathon function
  await updateParticipatedHacakthon(hackathonId, userEmail);

  // Get the hackathon event reference from the database
  const eventRef = doc(db, 'hackathons', hackathonId, 'myEvents', userEmail);
  const eventSnapshot = await getDoc(eventRef);

  // Verify that the event reference was added to the myEvents subcollection
  expect(eventSnapshot.exists()).toBeTruthy();

  // Get the user profile reference from the database
  const userProfile = await getUserProfile(user);
  const userRef = doc(userProfile.profile, hackathonId);
  const userSnapshot = await getDoc(userRef);

  // Verify that the hackathon reference was added to the user profile
  expect(userSnapshot.exists()).toBeTruthy();
});
  console.log(currentUser);
});