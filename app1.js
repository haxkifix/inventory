const { products, categories } = window;

console.log({ products, categories }, "Store Data");

document.addEventListener("DOMContentLoaded", function () {
  const navMenu = document.getElementById("menu");

  categories.forEach((category) => {
    const button = document.createElement("button");
    button.textContent = category.name;
    button.addEventListener("click", () => showProductsForCategory(category));
    navMenu.appendChild(button);
  });

  const defaultCategory = categories[0];
  showProductsForCategory(defaultCategory);
});

function addToCart(product) {
  cart.push(product);
  product.count++; // Increase the count of the selected product
  console.log(`Added ${product.name} to cart.`);
}
function showProductsForCategory(category) {
  const selectedCategoryTitle = document.getElementById("selected-category");
  selectedCategoryTitle.textContent = category.name;

  const tableBody = document.getElementById("category-products");
  tableBody.innerHTML = "";

  const filteredProducts = products.filter(
    (product) => product.categories.includes(category.id)
  );

  filteredProducts.forEach((product) => {
    const row = document.createElement("tr");

    const idCell = document.createElement("td");
    idCell.textContent = product.id;

    const nameCell = document.createElement("td");
    nameCell.textContent = product.name;

    const descriptionCell = document.createElement("td");
    descriptionCell.textContent = product.description;

    const priceCell = document.createElement("td");
    priceCell.textContent = product.price;

    const addToCartCell = document.createElement("td");
    const addToCartButton = document.createElement("button");
    addToCartButton.textContent = "Add to Cart"; // Text for the button
    addToCartButton.addEventListener("click", () => addToCart(product)); // Add event listener
    addToCartCell.appendChild(addToCartButton);
    
    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(descriptionCell);
    row.appendChild(priceCell);
    row.appendChild(addToCartCell);

    tableBody.appendChild(row);
  });
}


document.addEventListener("DOMContentLoaded", function () {
  const categoryProducts = document.getElementById("category-products");

  // Fetch products from the PHP script
  fetch("get_products.php")
    .then((response) => response.json())
    .then((data) => {
      categoryProducts.innerHTML = ""; // Clear previous content

      data.forEach((product) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${product.id}</td>
          <td>${product.Name}</td>
          <td>${product.Description}</td>
          <td>${product.price}</td>
          <td><button class="update-price-btn" data-product-id="${product.id}">Add to cart</button></td>

        `;
        const updateCartbtn = row.querySelector(".update-price-btn");
        updateCartbtn.addEventListener("click", () => {
          addToCart(product)
          }
        );
        categoryProducts.appendChild(row);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
});


