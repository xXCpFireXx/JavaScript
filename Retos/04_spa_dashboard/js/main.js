import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  getUsersSystem,
} from "./services.js";

import {
  capitalizeFirstLetter,
  formatDate,
  formatDateForInput,
  notification,
  random14Digits,
} from "./utils.js";

/* =================== RUTAS SPA =================== */
const routes = {
  "/": "./views/home.html",
  "/users": "./views/users.html",
  "/new-user": "./views/add-users.html",
  "/edit-user": "./views/edit-user.html",
  "/login": "./views/login.html",
};

const isAuth = () => {
  return localStorage.getItem("Auth") === "true";
};

const navigate = async (pathname) => {
  if (!isAuth()) pathname = "/login";

  const route = routes[pathname] || routes["/"];
  const html = await fetch(route).then((res) => res.text());
  document.getElementById("main-content").innerHTML = html;
  history.pushState({}, "", pathname);

  const aside = document.getElementById("aside-navbar");
  if (aside) {
    aside.style.display = pathname === "/login" ? "none" : "flex";
  }

  renderUserProfile();
  if (pathname === "/login") setupLoginForm();
  if (pathname === "/users") showUsers();
  if (pathname === "/new-user") postNewUser();
  if (pathname === "/edit-user") putUser();
};

/* =================== USUARIOS =================== */

const showUsers = async () => {
  const users = await getUsers();
  const tbody = document.getElementById("list-users");
  if (!tbody) return;

  tbody.innerHTML = "";

  users.forEach((user) => {
    const row = document.createElement("tr");
    row.dataset.userId = user.id;

    row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.phone}</td>
      <td>${user.enrollNumber}</td>
      <td>${user.dateOfAdmission}</td>
      <td>
        <button class="btn-edit" data-user-id="${user.id}">✏️</button>
        <button class="btn-delete" data-user-id="${user.id}">🗑️</button>
      </td>
    `;

    tbody.appendChild(row);
  });

  callNewUser();
  callEditUser();
  callDeleteUser();
};

const addUsers = async () => {
  const name = capitalizeFirstLetter(document.getElementById("name").value.trim());
  const email = document.getElementById("email").value.trim();
  const phone = parseInt(document.getElementById("phone").value);
  const date = formatDate(document.getElementById("date").value);
  const users = await getUsers();
  const rollNumber = random14Digits();

  const newUser = {
    id: String(users.length + 1),
    name,
    email,
    phone,
    enrollNumber: rollNumber,
    dateOfAdmission: date,
  };

  try {
    await addUser(newUser);
    notification(`User "${newUser.name}" added successfully!`, "#a7c957", 3000);
    showUsers();
  } catch {
    notification("Error adding user", "#e12c2c", 3000);
  }
};

const putUser = async () => {
  const userId = localStorage.getItem("editUserId");
  if (!userId) {
    notification("No user selected to edit", "#e12c2c", 3000);
    navigate("/users");
    return;
  }

  try {
    const users = await getUsers();
    const user = users.find((u) => u.id === userId);
    if (!user) throw new Error("User not found");

    document.getElementById("name").value = user.name;
    document.getElementById("email").value = user.email;
    document.getElementById("phone").value = user.phone;
    document.getElementById("date").value = formatDateForInput(user.dateOfAdmission);

    const form = document.getElementById("formEditUser");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const updatedUser = {
        ...user,
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: parseInt(document.getElementById("phone").value),
        dateOfAdmission: formatDate(document.getElementById("date").value),
      };

      try {
        await updateUser(userId, updatedUser);
        notification("User updated successfully!", "#a7c957", 3000);
        navigate("/users");
      } catch {
        notification("Error updating user", "#e12c2c", 3000);
      }
    });
  } catch (error) {
    notification("Error loading user data", "#e12c2c", 3000);
    navigate("/users");
  }

  localStorage.removeItem("editUserId");
};

const callNewUser = () => {
  const btn = document.getElementById("add-new-user");
  if (btn) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      navigate("/new-user");
    });
  }
};

const postNewUser = () => {
  const form = document.getElementById("formNewUser");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    addUsers();
    navigate("/users");
  });

  const cancelBtn = document.getElementById("btn-cancel");
  if (cancelBtn) {
    cancelBtn.addEventListener("click", (e) => {
      e.preventDefault();
      navigate("/users");
    });
  }
};

const callEditUser = () => {
  const buttons = document.querySelectorAll(".btn-edit");
  buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const id = e.target.dataset.userId;
      localStorage.setItem("editUserId", id);
      navigate("/edit-user");
    });
  });
};

const callDeleteUser = () => {
  const buttons = document.querySelectorAll(".btn-delete");
  buttons.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      const id = btn.dataset.userId;
      if (confirm("Are you sure you want to delete this user?")) {
        await deleteUser(id);
        navigate("/users");
      }
    });
  });
};

/* =================== LOGIN =================== */

const setupLoginForm = async () => {

  const usersSystem = await getUsersSystem();

  const form = document.getElementById("login-spa");
    form.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputUser = document.getElementById("user").value.trim();
    const inputPass = document.getElementById("password").value.trim();

    const userFound = usersSystem.find(
      (u) => u.user === inputUser && u.password === inputPass
    );

    if (userFound) {
      localStorage.setItem("Auth", "true");
      localStorage.setItem("role", userFound.role);
      localStorage.setItem("userName", userFound.name);

      navigate("/");
    } else {
      alert("Incorrect username or password");
    }
  });
}

const renderUserProfile = () => {
  const nameProfile = document.querySelector(".name-profile");
  const roleProfile = document.querySelector(".role-profile");

  if (nameProfile && roleProfile) {
    const name = localStorage.getItem("userName");
    const role = localStorage.getItem("role");

    nameProfile.textContent = name || "";

    if (role === "admin") {
      roleProfile.textContent = "Administrator";

      


    } else if (role === "user") {
      roleProfile.textContent = "User";
    } else {
      roleProfile.textContent = "";
    }
  }
};


const logoutBtn = document.querySelector(".logout");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.setItem("Auth", "false");
    localStorage.setItem("role", "false");
    navigate("/login");
  });
}

/* =================== SPA =================== */
window.addEventListener("popstate", () => {
  navigate(location.pathname);
});

window.addEventListener("DOMContentLoaded", () => {
  navigate(location.pathname);
});
