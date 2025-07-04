// ========== Modal Elements ==========
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");

// ========== Show Modal to Add Product ==========
// Shows a form inside a modal for adding a new product
const showModalAddProducts = () => {
  modalContent.innerHTML = `
    <h2 class="titleModal">Add Product</h2>
    <div class="addProductsContent">
      <input type="text" placeholder="Name" id="productName">
      <input type="number" placeholder="Price" id="productPrice">
      <button class="btnProducts" onclick="postProduct()">Save</button>
    </div>`;
  modal.showModal();

  // Allow user to submit with Enter key
  const inputAddProduct = document.getElementById("productPrice");
  inputAddProduct.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      postProduct();
    }
  });
};

// ========== Show All Products in Modal ==========
// Displays the list of products in a table inside the modal
const showProductsInModal = async () => {
  const products = await getProducts();

  if (products.length === 0) {
    notification("No products available", "#e12c2c", 3000);
  } else {
    const tableHTML = `
      <h2 class="titleModal">Product List</h2>
      <table>
        <tr class="trTable"><th>ID</th><th>NAME</th><th>PRICE</th></tr>
        ${products.map(product => `
          <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>$${product.price}</td>
          </tr>`).join('')}
      </table>
    `;
    modalContent.innerHTML = tableHTML;
    modal.showModal();
  }
};

// ========== Show Modal to Update Product ==========
// Displays a dropdown to select a product and update its info
const putProduct = async () => {
  const products = await getProducts();
  if (products.length === 0) {
    notification("No products available to update", "#e12c2c", 3000);
    return;
  }

  modalContent.innerHTML = `
    <h2 class="titleModal">Update Product</h2>
    <div class="contentUpdateProducts">
      <select id="productSelect" class="inputSelect">
        <option disabled selected>Select a product</option>
        ${products.map(p => `<option value="${p.id}">${p.name}</option>`).join('')}
      </select>
      <div class="inputsUpdateProduct" id="inputsUpdateProduct">
        <div class="inputDetails">
          <label for="updateName">Product name</label>
          <input type="text" id="updateName" placeholder="New name">
        </div>
        <div class="inputDetails">
          <label for="updatePrice">Product price</label>
          <input type="number" id="updatePrice" placeholder="New price">
        </div>
        <button class="btnProducts" onclick="sendUpdatedProduct()" id="updateBtn">Update</button>
      </div>
    </div>
  `;
  modal.showModal();

  // Load selected product details into input fields
  const select = document.getElementById("productSelect");
  select.addEventListener("change", () => {
    const selected = products.find(p => p.id == select.value);
    document.getElementById("inputsUpdateProduct").style.display = "flex";
    document.getElementById("updateName").value = selected.name;
    document.getElementById("updatePrice").value = selected.price;
  });

  window.selectedProducts = products;
};

// ========== Fetch All Products ==========
// Gets product data from the server
const getProducts = async () => {
  try {
    const response = await fetch("http://localhost:3000/productos");
    const data = await response.json();
    return data;
  } catch (error) {
    notification("Error obtaining the products", "#e12c2c", 3000);
    console.error("Error obtaining the products::", error);
    return [];
  }
};

// ========== Add New Product ==========
// Sends a new product to the server
const postProduct = async () => {
  const nameProduct = capitalizeFirstLetter(document.getElementById("productName").value.trim());
  const priceProduct = parseInt(document.getElementById("productPrice").value);
  const products = await getProducts();

  if (!nameProduct || !priceProduct) {
    notification("Complete each field", "#e12c2c", 3000);
    return;
  }

  const newProduct = { "id": String(products.length + 1), "name": nameProduct, "price": priceProduct };

  try {
    const response = await fetch('http://localhost:3000/productos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct)
    });
    const data = await response.json();
    notification(`Product "${data.name}" added successfully!`, "#a7c957", 3000);
  } catch (error) {
    notification("Error to add new product", "#e12c2c", 3000);
    console.error("Error to add new product:", error);
  }
  modal.close();
};

// ========== Send Product Update ==========
// Sends updated product info to the server
const sendUpdatedProduct = async () => {
  const id = document.getElementById("productSelect").value;
  const name = capitalizeFirstLetter(document.getElementById("updateName").value.trim());
  const price = parseInt(document.getElementById("updatePrice").value);

  if (!name || isNaN(price)) {
    notification("Please fill out the fields", "#e12c2c", 3000);
    return;
  }

  const productUpdated = { name, price };

  try {
    const res = await fetch(`http://localhost:3000/productos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productUpdated)
    });
    const data = await res.json();
    notification(`Product "${data.name}" updated successfully!`, "#a7c957", 3000);
    modal.close();
  } catch (err) {
    notification("Update failed", "#e12c2c", 3000);
    console.error("Update error:", err);
  }
};

// ========== Delete Product ==========
// Shows modal to select a product and delete it
const deleteProduct = async () => {
  const products = await getProducts();

  if (products.length === 0) {
    notification("No products available to delete", "#e12c2c", 3000);
    return;
  }

  modalContent.innerHTML = `
    <h2 class="titleModal">Delete Product</h2>
    <div class="contentDeleteProduct">
      <select id="productDeleteSelect" class="inputSelect">
        <option disabled selected>Select a product</option>
        ${products.map(p => `<option value="${p.id}">${p.name}</option>`).join('')}
      </select>
      <button class="btnProducts" id="deleteBtn">Delete</button>
    </div>
  `;
  modal.showModal();

  const select = document.getElementById("productDeleteSelect");
  const deleteBtn = document.getElementById("deleteBtn");

  select.addEventListener("change", () => {
    deleteBtn.style.display = "inline-block";
  });

  deleteBtn.addEventListener("click", async () => {
    const selectedId = select.value;
    const selectedName = select.options[select.selectedIndex].text;

    const confirmDelete = confirm(`Are you sure you want to delete "${selectedName}"?`);

    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:3000/productos/${selectedId}`, {
        method: 'DELETE'
      });

      if (!res.ok) throw new Error("Failed to delete");

      notification(`Product "${selectedName}" deleted`, "#28a745", 3000);
      modal.close();
    } catch (err) {
      notification("Delete failed", "#e12c2c", 3000);
      console.error("Delete error:", err);
    }
  });
};

// ========== Toast Notification ==========
// Displays a custom toast message using Toastify
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

// ========== Capitalize First Letter ==========
// Capitalizes the first character of a given string
const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
