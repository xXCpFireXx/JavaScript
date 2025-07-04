const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");

const showModalAddProducts = () => {
  modalContent.innerHTML = `
    <h2>Add Product</h2>
    <input type="text" placeholder="Name" id="productName">
    <input type="number" placeholder="Price" id="productPrice">
    <button onclick="postProduct()">Save</button>`;
  modal.showModal();
}

const showProductsInModal = async () => {
  const products = await getProducts();

  if (products.length === 0) {
    modalContent.innerHTML = "<p>No hay productos disponibles.</p>";
  } else {
    const tableHTML = `
      <h2>Product List</h2>
      <table>
        <tr><th>ID</th><th>Name</th><th>Price</th></tr>
        ${products.map(p => `
          <tr>
            <td>${p.id}</td>
            <td>${p.name}</td>
            <td>$${p.price}</td>
          </tr>`).join('')}
      </table>
    `;
    modalContent.innerHTML = tableHTML;
  }

  modal.showModal();
};

const getProducts = async () => {
  try {
    const response = await fetch("http://localhost:3000/productos");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return [];
  }
};

const postProduct = async () =>{
  const nameProduct = capitalizeFirstLetter(document.getElementById("productName").value.trim());
  const priceProduct = parseInt(document.getElementById("productPrice").value);
  const products = await getProducts();

  if (!nameProduct || !priceProduct) {
    alert("Complete each field");
    return;
  }

  const newProduct = { "id": String(products.length + 1), "name": nameProduct, "price":priceProduct};

  await fetch('http://localhost:3000/productos', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(newProduct)
  })
  .then(response => response.json())
  .then(data => console.log("Product added", data))
  .catch(error => console.error("Error to add new product:", error))
  modal.close();
}

const putProduct = async () =>{
  
}

const deleteProduct = async () =>{
  
}



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
