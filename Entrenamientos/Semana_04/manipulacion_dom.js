// ========== DOM ELEMENT REFERENCES ==========
// Reference to input elements by their IDs
const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");

// ========== SUBMIT ON ENTER ==========
// When pressing Enter on the age input, trigger data saving
ageInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();     // Prevent form submission
    addData();              // Save data to localStorage
    showConsoleData();      // Show saved data in console
  }
});

// ========== EVENT: SAVE BUTTON ==========
// When clicking the Save button, store the data and show in console
document.getElementById("saveButton").addEventListener("click", () => {
  addData();
  showConsoleData();
});

// ========== ADD DATA TO LOCAL STORAGE ==========
// Function to validate and save user input into localStorage
const addData = () => {
  // Ensure input fields exist
  if (!nameInput || !ageInput) {
    notification("Form elements do not exist.", "#e12c2c", 3000);
    console.error("Form elements do not exist.");
    return;
  }

  // Get and sanitize input values
  const name = capitalizeFirstLetter(nameInput.value.trim());
  const age = parseInt(ageInput.value);

  // Validate input and save to localStorage
  if (name && !isNaN(age)) {
    localStorage.setItem("userName", name);
    localStorage.setItem("userAge", age);
    notification(`"${name}" and "${age}" added successfully!`, "#a7c957", 3000);
    displayData();  // Show result on screen
  } else {
    notification("Please enter a valid name and a numeric age.", "#e12c2c", 3000);
  }

  // Clear input fields after saving
  nameInput.value = "";
  ageInput.value = "";
};

// ========== DISPLAY STORED DATA ==========
// Show saved data in the page output
const displayData = () => {
  const name = localStorage.getItem("userName");
  const age = localStorage.getItem("userAge");
  const outputDiv = document.getElementById("output");

  if (name && age) {
    outputDiv.textContent = `Hello ${name}, you are ${age} years old.`;
  } else {
    outputDiv.textContent = "No stored data found.";
  }
};

// ========== LOAD STORED DATA ON PAGE LOAD ==========
// Automatically show data when the page loads
window.onload = displayData;

// ========== SESSION STORAGE COUNTER SETUP ==========
// Initialize session counter if not already set
if (!sessionStorage.getItem("interactionCount")) {
  sessionStorage.setItem("interactionCount", 0);
}

// ========== UPDATE SESSION COUNTER ==========
// Increases the counter each time a button is clicked
const updateInteractionCount = () => {
  let count = parseInt(sessionStorage.getItem("interactionCount"));
  count++;
  sessionStorage.setItem("interactionCount", count);
  console.log(count)
  showConsoleData();  // Show updated count in console
};

// ========== ASSIGN COUNTER TO BUTTON CLICKS ==========
// Update interaction count when clicking Save or Clear
document.getElementById("saveButton").addEventListener("click", updateInteractionCount);
document.getElementById("clearButton").addEventListener("click", updateInteractionCount);

// ========== CLEAR LOCAL STORAGE ==========
// Clear saved name and age when Clear button is clicked
document.getElementById("clearButton").addEventListener("click", () => {
  localStorage.clear();
  notification("Local Storage deleted successfully!", "#a7c957", 3000);
  displayData(); // Refresh the message display
});

// ========== TOAST NOTIFICATION ==========
// Function to show a styled message using Toastify.js
const notification = (text, color, duration) => {
  Toastify({
    text: text,
    duration: duration,
    close: true,
    gravity: "top",
    position: "center",
    stopOnFocus: true,
    style: {
      borderRadius: "8px",
      padding: "15px",
      background: color,
    },
  }).showToast();
};

// ========== CAPITALIZE FUNCTION ==========
// Capitalizes the first letter of a string
const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// ========== CONSOLE LOGGER ==========
// Show saved data in the browser console for debugging
const showConsoleData = () => {
  console.clear(); // Clean up console view

  console.group("📦 Local Storage");
  console.log("userName:", localStorage.getItem("userName"));
  console.log("userAge:", localStorage.getItem("userAge"));
  console.groupEnd();

  console.group("🧭 Session Storage");
  console.log("interactionCount:", sessionStorage.getItem("interactionCount"));
  console.groupEnd();
};
