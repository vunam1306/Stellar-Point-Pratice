// JavaScript Basic Syntax Examples

// 1. Variables
let name = "Alice";       // Mutable variable, use let instead of var to avoid scope issues
const PI = 3.14;          // Constant variable

// 2. Data Types examples
let number = 42;          // Number
let greeting = "Hello";   // String
let isHappy = true;       // Boolean
let colors = ["red", "green", "blue"]; // Array
let person = { name: "Alice", age: 25 }; // Object
let nothing = null;       // Null
let notDefined;           // Undefined (no value assigned)

// 3. Operators example
let sum = 10 + 5;         // Addition
let bEqual = (10 === 5); // Strict equality (false)
let bAdult = true && false; // Logical AND (false)

// 4. Functions
function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet(name)); // Outputs: Hello, Alice!

// 5. Conditionals
let age = 20;
if (age >= 18) {
  console.log("Adult");
} else {
  console.log("Minor");
}

// 6. Loops

// For loop: print numbers 0 to 4
for (let i = 0; i < 5; i++) {
  console.log(i);
}

// While loop: print numbers 0 to 4
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}

// 7. Comments
// This is a single-line comment

/*
  This is a multi-line comment
  explaining that the code below
  will manipulate an HTML element if it exists
*/

// 8. Accessing HTML Elements (DOM manipulation)
const element = document.getElementById("myId");
if (element) {
  element.textContent = "New text set by JavaScript!";
}