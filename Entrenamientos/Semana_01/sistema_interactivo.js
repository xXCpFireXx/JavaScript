// Welcome message to the user
console.log('Welcome to the Interactive Messaging System!');

// Capture user data
let inputName = prompt("Please enter your name:");
let age = prompt("Please enter your age:");

// Convert age to a number
age = parseInt(age);

// Validate and display messages
if (isNaN(age)) {
    console.error("Error: Please enter a valid age using numbers.");
} else if (age < 18) {
    alert(`Hello ${inputName}, you are underage. Keep learning and enjoying coding!`);
} else {
    alert(`Hello ${inputName}, you are an adult. Get ready for great opportunities in the world of programming!`);
}

