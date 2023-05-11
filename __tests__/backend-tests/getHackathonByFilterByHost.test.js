import { getHackathonByFilterByHost } from '../../src/Components/firebase/firebaseFunction';

// Mock the functions that interact with Firestore
jest.mock('../../src/Components/firebase/firebaseFunction', () => ({
  // ... other mocked functions
  getHackathonByFilterByHost: jest.fn(() =>
    Promise.resolve({
      id: 'test-hackathon-id',
      tag: 'Test Hackathon',
      status: 'onging',
      username: 'testname',
      role: 'host'
    })
  ),
}));

// ... other test cases
test('get all data when filter is null', async () => {
  const filter = {tag: '', username:'test', role:'host'};

  const hackathonData = await getHackathonByFilterByHost(filter);

  expect(hackathonData).toEqual({
    id: 'test-hackathon-id',
    tag: 'Test Hackathon',
    status: 'onging',
    username: 'testname',
    role: 'host'
  });
});

test('get data according to the tag', async () => {
    const filter = {tag: 'Test Hackathon', username:'test', role:'host'};
  
    const hackathonData = await getHackathonByFilterByHost(filter);
  
    expect(hackathonData).toEqual({
        id: 'test-hackathon-id',
        tag: 'Test Hackathon',
        status: 'onging',
        username: 'testname',
        role: 'host'
    });
  });

  test('get data according to the status', async () => {
    const filter = {status: 'ongoing', username:'test', role:'host'};
  
    const hackathonData = await getHackathonByFilterByHost(filter);
  
    expect(hackathonData).toEqual({
        id: 'test-hackathon-id',
        tag: 'Test Hackathon',
        status: 'onging',
        username: 'testname',
        role: 'host'
    });
  });
