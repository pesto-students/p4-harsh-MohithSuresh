function fibonacci() {
  let current = 0;
  let next = 1;

  return {
    next: function () {
      let result = current;
      current = next;
      next = result + current;
      return { value: result, done: false };
    },
  };
}

// Example usage:
const fib = fibonacci();
for (let i = 0; i < 10; i++) {
  console.log(fib.next().value);
}
