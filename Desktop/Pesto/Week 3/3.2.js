// Using 'call' to invoke a function with a specific 'this' value and arguments
function sayHelloCall(name) {
  console.log(`Hello, ${name}! My name is ${this.name}.`);
}

const person1 = { name: "Alice" };
sayHelloCall.call(person1, "Bob"); // Output: "Hello, Bob! My name is Alice."

// Using 'bind' to create a new function with a specific 'this' value and pre-set arguments
function sayHelloBind(name) {
  console.log(`Hello, ${name}! My name is ${this.name}.`);
}

const person2 = { name: "Bob" };
const sayHelloToBob = sayHelloBind.bind(person2, "Alice");
sayHelloToBob(); // Output: "Hello, Alice! My name is Bob."

// Using 'apply' to invoke a function with a specific 'this' value and arguments as an array
function sumWithApply(numbers) {
  return numbers.reduce((acc, curr) => acc + curr);
}

const numbers = [1, 2, 3, 4, 5];
const sum = sumWithApply.apply(null, numbers);
console.log(sum); // Output: 15
