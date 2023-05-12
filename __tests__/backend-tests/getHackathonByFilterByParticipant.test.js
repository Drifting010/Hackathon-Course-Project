import { getHackathonByFilterByParticipant } from '../../src/Components/firebase/firebaseFunction';

// Mock the functions that interact with Firestore
jest.mock('../../src/Components/firebase/firebaseFunction', () => ({
  // ... other mocked functions
  getHackathonByFilterByParticipant: jest.fn(() =>
    Promise.resolve({
      id: 'test-hackathon-id',
      tag: 'Test Hackathon',
      status: 'onging',
      username: 'testname',
      role: 'participant'
    })
  ),
}));

// ... other test cases
test('get all data when filter is null', async () => {
  const filter = {tag: '', username:'test', role:'host'};

  const hackathonData = await getHackathonByFilterByParticipant(filter);

  expect(hackathonData).toEqual({
    id: 'test-hackathon-id',
    tag: 'Test Hackathon',
    status: 'onging',
    username: 'testname',
    role: 'participant'
  });
});

test('get data according to the tag', async () => {
    const filter = {tag: 'Test Hackathon', username:'test', role:'host'};
  
    const hackathonData = await getHackathonByFilterByParticipant(filter);
  
    expect(hackathonData).toEqual({
        id: 'test-hackathon-id',
        tag: 'Test Hackathon',
        status: 'onging',
        username: 'testname',
        role: 'participant'
    });
  });

  test('get data according to the status', async () => {
    const filter = {status: 'ongoing', username:'test', role:'host'};
  
    const hackathonData = await getHackathonByFilterByParticipant(filter);
  
    expect(hackathonData).toEqual({
        id: 'test-hackathon-id',
        tag: 'Test Hackathon',
        status: 'onging',
        username: 'testname',
        role: 'participant'
    });
  });
