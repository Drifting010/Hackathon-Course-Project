// define current time
// caculate the days between startDate and Now
function daysDiff(startDate) {
  // change the date format
  //   const date = startDate.toDate();
  const date = startDate.seconds * 1000;
  // get the current date
  const now = new Date();
  //return the diff of dates
  return Math.floor((now - date) / (1000 * 60 * 60 * 24));
}

// Calculate hackathon progress percentage
function hackathonPercentage(startDate, endDate) {
  // change the date formate
  //   const start = startDate.toDate();
  //   const end = endDate.toDate();
  const start = startDate.seconds * 1000;
  const end = endDate.seconds * 1000;
  // get the current date
  const now = new Date();
  //return the diff of dates
  const totalDays = Math.floor((end - start) / (1000 * 60 * 60 * 24));
  const costDays = Math.floor((now - start) / (1000 * 60 * 60 * 24));
  return ((totalDays - costDays) / totalDays) * 100;
}

export { daysDiff, hackathonPercentage };
