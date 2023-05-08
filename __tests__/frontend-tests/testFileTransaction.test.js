import { test } from 'vitest';
import { ref } from 'firebase/storage';
import { downLoadFile } from '../../src/Components/firebase/firebaseFunction';
import { storage } from '../../src/firebaseConfig';

test('downLoadFile integration test: downloads icon.jpeg successfully', async ({ expect }) => {
  // Create a reference to the icon.jpeg file in the userIcons folder
  const fileRef = ref(storage, 'userIcons/icon.jpeg');

  // Call the downLoadFile function and check if it throws an error
  let error = null;
  try {
    downLoadFile(fileRef);
  } catch (e) {
    error = e;
  }
  expect(error).toBe(null);
});
