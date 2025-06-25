// Project Initialization
console.log("Data Management with Objects, Sets, and Maps!");

// Define the products object
const products = {
  1: { id: 1, name: "Laptop", price: 1500 },
  2: { id: 2, name: "Mouse", price: 25 },
  3: { id: 3, name: "Keyboard", price: 50 },
};

// Create a Set with the names of the products
const productSet = new Set(
  Object.values(products).map((product) => product.name)
);

// Create a Map to add categories to the products
const productMap = new Map([
  ["Electronics", ["Laptop"]],
  ["Accessories", ["Mouse", "Keyboard"]]
]);

// Iterate over the products object
for (const id in products) {
  console.log(`Product ID: ${id}, Details: `, products[id]);
}

// Iterate over the Set of products
for (const product of productSet) {
  console.log("Unique Product: ", product);
}

// Iterate over the Map of products
productMap.forEach((products, category) => {
  products.forEach(product => {
    console.log(`Category: ${category}, Product: ${product}`);
  });
});

console.log("Complete Data Management Tests:");
console.log("Product Lists (Object): ", products);
console.table(products);
console.log("Unique Product List (Set): ", productSet);
console.log("Categories and Products (Map): ", productMap);
