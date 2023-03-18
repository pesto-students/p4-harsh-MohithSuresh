function generateNumberWithPromise(resolutionTime, rejectTime, callbacks) {
  const randomNumber = Math.floor(Math.random() * 1000) + 1; // generating a random number
  const isDivisibleByFive = randomNumber % 5 === 0;

  setTimeout(
    () => {
      if (isDivisibleByFive) {
        callbacks.reject(`Rejected: ${randomNumber} is divisible by 5`); // rejecting promise
      } else {
        callbacks.resolve(`Resolved: ${randomNumber}`); // resolving promise
      }
    },
    isDivisibleByFive ? rejectTime : resolutionTime
  ); // setting the resolution/rejection time
}

generateNumberWithPromise(
  2000, // resolution time of 2 seconds
  1000, // rejection time of 1 second
  {
    resolve: (result) => console.log(result),
    reject: (error) => console.error(error),
  }
);
