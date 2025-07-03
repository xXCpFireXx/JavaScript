
const getProducts = async () =>{
  fetch('http://localhost:3000/productos')
  .then(response => response.json())
  .then(data => console.log("Productos disponibles", data))
  .catch(error => console.error("Error al obtener productos:", error))
}

const postProduct = async () =>{
  fetch()
}

const putProduct = async () =>{
  
}

const deleteProduct = async () =>{
  
}


/* 
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
 */
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
