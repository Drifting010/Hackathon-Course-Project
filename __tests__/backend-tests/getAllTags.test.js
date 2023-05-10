import { getAllTags } from '../../src/Components/firebase/firebaseFunction';

// Mock the functions that interact with Firestore
jest.mock('../../src/Components/firebase/firebaseFunction', () => ({
  // ... other mocked functions
  getAllTags: jest.fn(() =>
    Promise.resolve('tag')
  ),
}));

// test cases
test('get all tags', async () => {
  const tags = await getAllTags();
  expect(tags).toEqual('tag');
});


