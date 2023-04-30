import { initializeTestApp } from "@firebase/rules-unit-testing";
import { getHackathon } from "../../src/pages/testPages/firebase/firebaseFunction";

const testHackathonId = "hackathon1";
const testApp = initializeTestApp({
  projectId: "a-plus-on-the-way",
  auth: {
    uid: "9V8r7QxKNEZtQPvGVVEydU8TQfP2",
  },
});

describe("Firebase read tests for hackathons", () => {
  it("reads testHackathon data from hackathons collection using getHackathon", async () => {
    const hackathon = await getHackathon(testHackathonId);

    expect(hackathon).not.toBeNull();
    expect(hackathon.id).toBe(testHackathonId);
    expect(hackathon.title).toBeDefined();
    expect(hackathon.status).toBeDefined();
    expect(hackathon.startDate).toBeDefined();
    expect(hackathon.endDate).toBeDefined();
  });
});

afterAll(async () => {
  await testApp.delete();
});
