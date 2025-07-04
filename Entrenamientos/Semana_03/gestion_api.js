const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");

const showModalAddProducts = () => {
  modalContent.innerHTML = `
    <h2 class="titleModal">Add Product</h2>
    <div class="addProductsContent">
      <input type="text" placeholder="Name" id="productName">
      <input type="number" placeholder="Price" id="productPrice">
      <button class="btnAddProducts" onclick="postProduct()">Save</button>
    </div>`;
  modal.showModal();

  const inputAddProduct = document.getElementById("productPrice");
  inputAddProduct.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        postProduct();
    }
  });

}

const showProductsInModal = async () => {
  const products = await getProducts();

  if (products.length === 0) {
    modalContent.innerHTML = "<p>There isn't products.</p>";
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
  }
  modal.showModal();
};

const getProducts = async () => {
  try {
    const response = await fetch("http://localhost:3000/productos");
    const data = await response.json();
    return data;
  } catch (error) {
    notification("Error obtaining the products","#e12c2c",3000);
    console.error("Error obtaining the products::", error);
    return [];
  }
};

const postProduct = async () =>{
  const nameProduct = capitalizeFirstLetter(document.getElementById("productName").value.trim());
  const priceProduct = parseInt(document.getElementById("productPrice").value);
  const products = await getProducts();

  if (!nameProduct || !priceProduct) {
    notification("Complete each field","#e12c2c",3000);
    return;
  }

  const newProduct = { "id": String(products.length + 1), "name": nameProduct, "price":priceProduct};

  await fetch('http://localhost:3000/productos', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(newProduct)
  })
  .then(response => response.json())
  .then(data => alert(`Product ${data.name} added successfully`))
  .catch(error => {notification("Error to add new product","#e12c2c",3000)
    console.error("Error to add new product:", error)
  })
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
