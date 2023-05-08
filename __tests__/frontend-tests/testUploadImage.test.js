import { test, spy } from 'vitest';

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../src/firebaseConfig';
import { uploadImage } from '../../src/Components/firebase/firebaseFunction';

const imageUrl = 'https://picsum.photos/200/300';

async function fetchImageAsBlob(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.statusText}`);
  }
  return await response.blob();
}

const createSpy = (obj, methodName) => {
  const originalMethod = obj[methodName];
  const calls = [];

  obj[methodName] = (...args) => {
    calls.push({ args });
    return originalMethod(...args);
  };

  return {
    calls,
    restore: () => {
      obj[methodName] = originalMethod;
    },
  };
};

test('upload image with progress and completion', async ({ expect }) => {
  const testUserId = 'test-user-id';

  // Fetch the image Blob
  const data = "Hello, world!";
  const blob = new Blob([data], { type: "text/plain" });

  Object.defineProperty(blob, 'byteLength', { value: 11340 });

  await uploadImage(blob, testUserId);

  expect(logSpy.calls.length).toBe(3);
  expect(logSpy.calls[1].args).toEqual(['Upload is 100% done']);
  expect(logSpy.calls[2].args[0]).toEqual('File available at');
  expect(logSpy.calls[2].args[1]).toContain('https://');

  // Restore the original console.log and uploadBytesResumable functions
  logSpy.restore();
  uploadBytesResumable = originalUploadBytesResumable;
});
