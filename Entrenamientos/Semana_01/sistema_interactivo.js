/* Function that executes everything related to console mode */
const consoleMode = () => {
  hideGraphicMode();

  setTimeout(() => { // Wait a little bit before opening the prompts.
    // Welcome message to the user
    console.log("Welcome to the Interactive Messaging System!");

    // Capture user data
    let inputName = prompt("Please enter your name:");
    let age = prompt("Please enter your age:");

    if (inputName === "" && age === "") {
        alert("Error: Please enter valid values");
    } else {
        // Convert age to a number
        age = parseInt(age);

        // Put the first letter in uppercase
        inputName = capitalizeFirstLetter(inputName);

        // Validate and display messages
        if (isNaN(age)|| age < 0) {
            alert("Error: Please enter a valid age.")
            console.error("Error: Please enter a valid age.");
        } else if (age < 18) {
            alert(`Hello ${inputName}, you are underage. Keep learning and enjoying coding!`);
        } else {
            alert(`Hello ${inputName}, you are an adult. Get ready for great opportunities in the world of programming!`);
        }
    }
  }, 100); // 100 milliseconds to allow the DOM to update.
};

/* Function that executes everything related to graphic mode */
const graphicMode = () => {
  let inputName = document.getElementById("nameForm").value;
  let age = document.getElementById("ageForm").value;

  if (inputName === "" && age === "") { // Check if there are no empty spaces in the inputs.
    notification("⚠️ Error: Please enter valid values.", "#7353baff", 2000);
  } else {
    // Convert age to a number
    age = Number(age);

    // Put the first letter in uppercase
    inputName = capitalizeFirstLetter(inputName);

    if (isNaN(age) || age < 0) {
      notification("⚠️ Error: Please enter a valid age.", "#7353baff", 2000); // Execute the notification function
      ageForm.value = ""; // Clean ageForm input
    } else if (age < 18) {
      notification(`👋 Hello ${inputName}, you are underage. Keep learning and enjoying coding!`, "#a68ddb", 5000);
      nameForm.value = ""; // Clean nameForm input
      ageForm.value = "";
      hideGraphicMode();
    } else {
      notification(`👋 Hello ${inputName}, you are an adult. Get ready for great opportunities in the world of programming!`, "#a68ddb", 5000);
      nameForm.value = "";
      ageForm.value = "";
      hideGraphicMode();
    }
  }
};

// Function that shows the hidden div 'graphicMode'.
const showGraphicMode = () => {
  let containerGraphicMode = document.getElementById("graphicMode");
  containerGraphicMode.style.display = "flex";
};

// Function that hides the div 'graphicMode'.
const hideGraphicMode = () => {
  let containerGraphicMode = document.getElementById("graphicMode");
  containerGraphicMode.style.display = "none";
};

// Function that executes Toastify.js
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
// Function that allow put the first letter in uppercase
const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
