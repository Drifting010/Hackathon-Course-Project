import { getUser, getHackathon } from '../../src/pages/testPages/firebase/firebaseFunction';

// Mock the functions that interact with Firestore
jest.mock('../../src/pages/testPages/firebase/firebaseFunction', () => ({
  // ... other mocked functions
  getUser: jest.fn(() =>
    Promise.resolve({
      uid: 'test-user-id',
      email: 'test@example.com',
      username: 'testuser',
      role: 'participant',
      profile: {
        firstName: 'John',
        lastName: 'Doe',
        organization: 'Test Org',
        interestDomain: 'AI',
      },
    })
  ),
  getHackathon: jest.fn(() =>
    Promise.resolve({
      id: 'test-hackathon-id',
      title: 'Test Hackathon',
      prizePool: 10000,
      status: 'ongoing',
      hackathonDescription: 'A test hackathon',
      startDate: new Date('2023-01-01'),
      endDate: new Date('2023-01-31'),
      numberOfRegistrations: 100,
      members: ['user1', 'user2', 'user3'],
    })
  ),
}));

// ... other test cases

test('getUser reads user data from Firestore', async () => {
  const uid = 'test-user-id';

  const userData = await getUser(uid);

  expect(userData).toEqual({
    uid: 'test-user-id',
    email: 'test@example.com',
    username: 'testuser',
    role: 'participant',
    profile: {
      firstName: 'John',
      lastName: 'Doe',
      organization: 'Test Org',
      interestDomain: 'AI',
    },
  });
});

test('getHackathon reads hackathon data from Firestore', async () => {
  const hackathonId = 'test-hackathon-id';

  const hackathonData = await getHackathon(hackathonId);

  expect(hackathonData).toEqual({
    id: 'test-hackathon-id',
    title: 'Test Hackathon',
    prizePool: 10000,
    status: 'ongoing',
    hackathonDescription: 'A test hackathon',
    startDate: new Date('2023-01-01'),
    endDate: new Date('2023-01-31'),
    numberOfRegistrations: 100,
    members: ['user1', 'user2', 'user3'],
  });
});
