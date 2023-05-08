import { getDownloadURL, ref } from 'firebase/storage';
import { downLoadFile } from '../../src/Components/firebase/firebaseFunction';
import { storage } from '../../src/firebaseConfig';

describe('downLoadFile integration test', () => {
  it('downloads icon.jpeg successfully', async () => {
    // Create a reference to the icon.jpeg file in the userIcons folder
    const fileRef = ref(storage, 'userIcons/icon.jpeg');

    // Call the downLoadFile function and check if it throws an error
    await expect(downLoadFile(fileRef)).resolves.not.toThrow();
  });
});

