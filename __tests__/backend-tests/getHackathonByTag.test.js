import { getHackathonByTag } from '../../src/Components/firebase/firebaseFunction';

// Mock the functions that interact with Firestore
jest.mock('../../src/Components/firebase/firebaseFunction', () => ({
  // ... other mocked functions
  getHackathonByTag: jest.fn(() =>
    Promise.resolve({
      id: 'test-hackathon-id',
      tag: 'Test Hackathon',
      status: 'onging',
    })
  ),
}));

// ... other test cases
test('get all data when filter is null', async () => {
  const filter = {tag: ''};

  const hackathonData = await getHackathonByTag(filter);

  expect(hackathonData).toEqual({
    id: 'test-hackathon-id',
    tag: 'Test Hackathon',
    status: 'onging',
  });
});

test('get data according to the tag', async () => {
    const filter = {tag: 'Test Hackathon'};
  
    const hackathonData = await getHackathonByTag(filter);
  
    expect(hackathonData).toEqual({
        id: 'test-hackathon-id',
        tag: 'Test Hackathon',
        status: 'onging',
    });
  });

  test('get data according to the status', async () => {
    const filter = {status: 'ongoing'};
  
    const hackathonData = await getHackathonByTag(filter);
  
    expect(hackathonData).toEqual({
        id: 'test-hackathon-id',
        tag: 'Test Hackathon',
        status: 'onging',
    });
  });
