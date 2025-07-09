const routes = {
  "/": "./views/home.html",
  "/users": "./views/users.html",
  "/new-user": "./views/add-users.html",
  "/login": "./views/login.html",
};

/* const isAuth = () => {
  const result = localStorage.getItem("Auth") || null;
  const resultBool = result === "true";
  return resultBool;
}; */

const navigate = async (pathname) => {
  const route = routes[pathname] || routes["/"];
  const html = await fetch(route).then((res) => res.text());
  document.getElementById("main-content").innerHTML = html;
  history.pushState({}, "", pathname);

  if (pathname === "/login") {
    const aside = document.getElementById("aside-navbar");
    aside.style.display = "none";
  }

  if (pathname === "/users") {
    showUsers();
    callNewUser();
  }

  if (pathname === "/new-user") {
    postNewUser();
  }
};

document.body.addEventListener("click", (e) => {
  if (e.target.matches("[data-link]")) {
    e.preventDefault();
    const path = e.target.getAttribute("href");
    navigate(path);
  }
});

/* Methods */
/* GET */
const getUsers = async () => {
  try {
    const response = await fetch("http://localhost:3000/users");
    const data = await response.json();
    return data;
  } catch (error) {
    notification("Error obtaining the users", "#e12c2c", 3000);
    console.error("Error obtaining the users::", error);
    return [];
  }
};
/* MOSTRAR USUARIOS */
const showUsers = async () => {
  const users = await getUsers();
  const tbody = document.getElementById("list-users");
  if (!tbody) return;

  tbody.innerHTML = "";

  users.forEach((user) => {
    const row = document.createElement("tr");
    row.innerHTML = `      
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.phone}</td>
      <td>${user.enrollNumber}</td>
      <td>${user.dateOfAdmission}</td>`;
    tbody.appendChild(row);
  });
};

/* POST */
const addUSers = async () => {
  const nameUser = capitalizeFirstLetter(document.getElementById("name").value.trim());
  const email = document.getElementById("email").value.trim();
  const phone = parseInt(document.getElementById("phone").value);
  const date = formatDate(document.getElementById("date").value);
  const users = await getUsers();

  const rollNumber = random14Digits();
  const newUser = {
    id: users.length + 1,
    name: nameUser,
    email: email,
    phone: phone,
    enrollNumber: rollNumber,
    dateOfAdmission: date,
  };

  try {
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    const data = await response.json();
    notification(`User "${data.name}" added successfully!`, "#a7c957", 3000);

  } catch (error) {

    notification("Error to add new user", "#e12c2c", 3000);
    console.error("Error to add new user:", error);
  }
};

const callNewUser = () => {
  const btnAddUser = document.getElementById("add-new-user");
  btnAddUser.addEventListener("click", (e) => {
    e.preventDefault();
    navigate("/new-user");
  });
};

const postNewUser = () => {
  const form = document.getElementById("formNewUser");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    addUSers();
  });
};

/* Numero random de 14 digitos */
const random14Digits = () => {
  return Math.floor(Math.random() * 9e13 + 1e13).toString();
};

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

const formatDate = (inputDate) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const [year, month, day] = inputDate.split("-");
  const monthAbbr = months[parseInt(month, 10) - 1];

  return `${day}-${monthAbbr}-${year}`;
}