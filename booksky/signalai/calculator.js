
// Addition function
function add(a, b) {
    return a + b;
}

// Subtraction function
function subtract(a, b) {
    return a - b;
}

// Multiplication function
function multiply(a, b) {
    return a * b;
}

// Division function
function divide(a, b) {
    if (b === 0) {
        return "Cannot divide by zero";
    }
    else {
        return a / b;
    }
}


// Get numbers from user
let num1 = Number(prompt("Enter first number:"));

let num2 = Number(prompt("Enter second number:"));


// Select operation
let operation = prompt(
    "Choose operation:\n1. Add\n2. Subtract\n3. Multiply\n4. Divide"
);


// Store result
let result;


// Switch statement
switch (operation) {

    case "1":
        result = add(num1, num2);
        break;

    case "2":
        result = subtract(num1, num2);
        break;

    case "3":
        result = multiply(num1, num2);
        break;

    case "4":
        result = divide(num1, num2);
        break;

    default:
        result = "Invalid operation";
}


// Display result
console.log("First Number: " + num1);

console.log("Second Number: " + num2);

console.log("Operation: " + operation);

console.log("Result: " + result);
