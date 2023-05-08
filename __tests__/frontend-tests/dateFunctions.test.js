import {daysDiff, hackathonPercentage} from '../../src/hooks/dateFunctions'
import { Timestamp } from 'firebase/firestore';

// define test date
const seconds = 1620524532;
const nanoseconds = 0;
const timestamp1 = new Timestamp(seconds, nanoseconds);
const timestamp2 = new Timestamp(seconds  + (1000 * 60 * 60 * 24 * 30), nanoseconds);
 
describe('daysDiff', () => {
  test('returns correct number of days', () => {
    const startDate = new Date(timestamp1);
    const expectedDays = Math.floor((new Date() - startDate) / (1000 * 60 * 60 * 24));
    expect(daysDiff(startDate)).toBe(expectedDays);
  });
});

describe('hackathonPercentage', () => {
  test('returns correct percentage', () => {
    const startDate = new Date(timestamp1);
    const endDate = new Date(timestamp2);
    const totalDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
    const costDays = Math.floor((new Date() - startDate) / (1000 * 60 * 60 * 24));
    const expectedPercentage = ((totalDays - costDays) / totalDays) * 100;
    expect(hackathonPercentage(startDate, endDate)).toBe(expectedPercentage);
  });
});
