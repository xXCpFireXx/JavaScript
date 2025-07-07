// ========== DOM ELEMENT REFERENCES ==========
const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");

// ========== SUBMIT ON ENTER ==========
ageInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault(); // Prevents form submission
    addData();          // Calls function to store data
  }
});

// ========== EVENT: SAVE BUTTON ==========
document.getElementById("saveButton").addEventListener("click", () => {
  addData();
});

// ========== ADD DATA TO LOCAL STORAGE ==========
const addData = () => {
  // Check if inputs exist
  if (!nameInput || !ageInput) {
    notification("Form elements do not exist.", "#e12c2c", 3000);
    console.error("Form elements do not exist.");
    return;
  }

  // Get and clean values
  const name = capitalizeFirstLetter(nameInput.value.trim());
  const age = parseInt(ageInput.value);

  // Validate and store in Local Storage
  if (name && !isNaN(age)) {
    localStorage.setItem("userName", name);
    localStorage.setItem("userAge", age);
    notification(`"${name}" and "${age}" added successfully!`, "#a7c957", 3000);
    displayData();
  } else {
    notification("Please enter a valid name and a numeric age.", "#e12c2c", 3000);
  }

  // Clear input fields
  nameInput.value = "";
  ageInput.value = "";
};

// ========== DISPLAY STORED DATA ==========
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
window.onload = displayData;

// ========== SESSION STORAGE COUNTER SETUP ==========
if (!sessionStorage.getItem("interactionCount")) {
  sessionStorage.setItem("interactionCount", 0);
}

// ========== UPDATE SESSION COUNTER ==========
const updateInteractionCount = () => {
  let count = parseInt(sessionStorage.getItem("interactionCount"));
  count++;
  sessionStorage.setItem("interactionCount", count);
  console.log(`Interactions in this session: ${count}`);
};

// ========== ASSIGN COUNTER TO BUTTON CLICKS ==========
document.getElementById("saveButton").addEventListener("click", updateInteractionCount);
document.getElementById("clearButton").addEventListener("click", updateInteractionCount);

// ========== CLEAR LOCAL STORAGE ==========
document.getElementById("clearButton").addEventListener("click", () => {
  localStorage.clear();
  displayData(); // Refresh displayed output
});

// ========== TOAST NOTIFICATION ==========
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
const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
