import {
  setRef,
  // getDocumentByRef,
} from "../../src/Components/firebase/firebaseFunction";

describe("test whether ref created successfully with setRef ", () => {
  const userId = "test-user-id";
  const dir = "userIcons";

  test("should return a valid Firebase Storage reference", async () => {
    const fileRef = await setRef(userId, dir);

    // Check that the reference is valid
    expect(fileRef).toBeDefined();
    expect(fileRef.fullPath).toBe("userIcons/test-user-id");
    expect(fileRef.toString()).toBe(
      `gs://a-plus-on-the-way.appspot.com/${dir}/${userId}`
    );
  });
});

