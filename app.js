const { products, categories } = window;

// For debugging, display all of our data in the console
console.log({ products, categories }, "Store Data");

// Wait for the page to load before executing our code
document.addEventListener("DOMContentLoaded", function () {
  // Task 1: Create buttons for store categories
  const navMenu = document.getElementById("menu");

  // Loop through each category and create a button element for it
  categories.forEach((category) => {
    const button = document.createElement("button");
    button.textContent = category.name;
    // Add a click event listener to show the products for this category when the button is clicked
    button.addEventListener("click", () => showProductsForCategory(category));
    navMenu.appendChild(button);
  });

  // Task 2: Show a list of products from the first category by default
  const defaultCategory = categories[0];
  showProductsForCategory(defaultCategory);
});

// Function to show products for a specific category
function showProductsForCategory(category) {
  // Task 2a: Update the text of the Selected Category Title above the table
  const selectedCategoryTitle = document.getElementById("selected-category");
  selectedCategoryTitle.textContent = category.name;

  // Task 2b: Clear the current rows from the table body
  const tableBody = document.getElementById("category-products");
  tableBody.innerHTML = "";

   // Add product actions event listeners
  const removeProductButton = document.getElementById("remove-product");
  const addManualProductButton = document.getElementById("add-manual-product"); // Add manual product button
  
  removeProductButton.addEventListener("click", removeSelectedProduct);
  addManualProductButton.addEventListener("click", addNewManualProduct); // Add manual product event listener

  // Task 2c: Filter products by category
  const filteredProducts = products.filter(
    (product) => product.categories.includes(category.id)
  );
  // Task 2d: Loop over the filtered products and add them to the table body
  filteredProducts.forEach((product) => {
    const row = document.createElement("tr");

    // Task 2d.i: Add a click event listener to the row to log the product when clicked
    row.addEventListener("click", () => console.log(product));

    const idCell = document.createElement("td");
    idCell.textContent = product.id;

    const nameCell = document.createElement("td");
    nameCell.textContent = product.name;

    const descriptionCell = document.createElement("td");
    descriptionCell.textContent = product.description;

    const priceCell = document.createElement("td");
    priceCell.textContent = product.price;

    const actionCell = document.createElement("td"); // Add Action column
    const actionButton = document.createElement("button"); // Create toggle button
    actionButton.textContent = product.available ? "Available" : "Unavailable"; // Set initial state
    actionButton.addEventListener("click", () => toggleAvailability(product)); // Toggle availability on click
    actionCell.appendChild(actionButton); // Append the button to the cell

    const countCell = document.createElement("td"); // Add Count column
    const countInput = document.createElement("input"); // Create input field for count
    countInput.type = "number";
    countInput.min = 0;
    countInput.value = product.available ? product.count : 0; // Set count based on availability
    countInput.disabled = !product.available; // Disable input if not available
    countCell.appendChild(countInput); // Append input field

    const updateCountCell = document.createElement("td"); // Add Update Count column
    const updateCountButton = document.createElement("button"); // Create update count button
    updateCountButton.textContent = "Update";
    updateCountButton.addEventListener("click", () => updateProductCount(product, countInput.value)); // Update count on button click
    updateCountCell.appendChild(updateCountButton); // Append the button to the cell

    const updatePriceCell = document.createElement("td"); // Add Update Price column
    const updatePriceButton = document.createElement("button"); // Create update price button
    updatePriceButton.textContent = "Change Price"; // Updated button text
    updatePriceButton.addEventListener("click", () => changeProductPrice(product, priceCell)); // Change price on button click
    updatePriceCell.appendChild(updatePriceButton); // Append the button to the cell

    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(descriptionCell);
    row.appendChild(priceCell);
    row.appendChild(actionCell);
    row.appendChild(countCell);
    row.appendChild(updateCountCell); // Append the Update Count cell
    row.appendChild(updatePriceCell); // Append the Update Price cell

    tableBody.appendChild(row);
  });
}

// Function to toggle product availability
function toggleAvailability(product) {
    product.available = !product.available;
    showProductsForCategory(categories.find(cat => cat.id === product.categories[0]));
}

// Function to update product count
function updateProductCount(product, newCount) {
    newCount = parseInt(newCount);
    if (!isNaN(newCount)) {
        product.count = newCount;
        showProductsForCategory(categories.find(cat => cat.id === product.categories[0]));
    } else {
        console.log(`Invalid count value for product ${product.name}`);
    }
}

// Function to change product price
function changeProductPrice(product, priceCell) {
    const newPrice = parseFloat(prompt(`Enter new price for ${product.name}:`));
    if (!isNaN(newPrice)) {
        product.price = newPrice;
        priceCell.textContent = newPrice; // Update the displayed price
        priceCell.style.backgroundColor = "yellow"; // Change cell background temporarily
        setTimeout(() => {
            priceCell.style.backgroundColor = ""; // Reset cell background after a delay
        }, 1000); // Change back after 1 second
    } else {
        console.log(`Invalid price value for product ${product.name}`);
    }
}

// Function to remove the selected
function removeSelectedProduct() {
    const selectedProductId = prompt("Enter the ID of the product to remove:");
    if (selectedProductId) {
      const indexToRemove = products.findIndex(product => product.id === selectedProductId);
      if (indexToRemove !== -1) {
        products.splice(indexToRemove, 1);
        showProductsForCategory(categories[0]);
      } else {
        alert("Product not found!");
      }
    }
  }

// Function to add a new product manually
function addNewManualProduct() {
  const id = prompt("Enter product ID:");
  const name = prompt("Enter product name:");
  const description = prompt("Enter product description:");
  const price = parseFloat(prompt("Enter product price:"));
  const category = parseFloat(prompt("Enter product category:"));
  if (id && name && description && !isNaN(price)) {
    const newProduct = {
      id: id,
      name: name,
      description: description,
      price: price,
      available: false,
      count: 0,
      categories: category, // Assign a default category
    };

    products.push(newProduct);
    showProductsForCategory(categories.find(cat => cat.id === newProduct.categories[0]));
  } else {
    console.log("Invalid input for adding product.");
  }
}

 // The value you want to send

// Construct the URL with the variable value as a query parameter
document.addEventListener("DOMContentLoaded", function () {
  const categoryProducts = document.getElementById("category-products");
  function updateCount(productId, newCount) {
    fetch("update_count.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: productId,
        count: newCount,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Count updated successfully:", data);
        // You can perform additional actions here if needed
      })
      .catch((error) => console.error("Error updating count:", error));
  }
  // Function to handle price update
  function updatePrice(productId, newPrice) {
    fetch("update_price.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: productId,
        price: newPrice,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Price updated successfully:", data);
        // You can perform additional actions here if needed
      })
      .catch((error) => console.error("Error updating price:", error));
  }

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
          <td><button class="update-price-btn" data-product-id="${product.id}">Update Price</button></td>
          <td>${product.count}</td>
          <td><button class="update-count-btn" data-product-id="${product.id}">Update count</button></td>
        `;
        categoryProducts.appendChild(row);

        const updatePriceBtn = row.querySelector(".update-price-btn");
        updatePriceBtn.addEventListener("click", () => {
          const newPrice = prompt("Enter the new price:");
          if (newPrice !== null) {
            updatePrice(product.id, parseFloat(newPrice));
            // You might want to update the UI to reflect the new price immediately
          }
        });
        const updateCountbtn = row.querySelector(".update-count-btn");
        updateCountbtn.addEventListener("click", () => {
          const newCount = prompt("Enter the new Count:");
          if (newCount !== null) {
            updateCount(product.id, parseFloat(newCount));
            // You might want to update the UI to reflect the new price immediately
          }
        });
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
});

document.getElementById("remove-product").addEventListener("click", function () {
  var productID = document.getElementById("product-id-input").value;

  // Send an AJAX request to the PHP script
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "remove_product.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
              var response = JSON.parse(xhr.responseText);
              alert(response.message); // Show a message indicating success or failure
          } else {
              alert("Error occurred while removing the product");
          }
      }
  };
  xhr.send("product_id=" + encodeURIComponent(productID));
});
document.getElementById("add-product").addEventListener("click", function () {
  const id = prompt("Enter Product ID:");
  const name = prompt("Enter Product Name:");
  const description = prompt("Enter Product Description:");
  const status = prompt("Enter Product Status:");
  const price = parseFloat(prompt("Enter Product Price:"));
  const count = parseInt(prompt("Enter Product Count:"));
  const category = prompt("Enter product category:");


  const newProduct = {
    id: id,
    name: name,
    description: description,
    status: status,
    price: price,
    count: count,
    categories: category,
  };

  // Send data to the server using AJAX
  fetch("insert_product.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProduct),
  })
    .then(response => response.json())
    .then(data => {
      // Handle response from server if needed
    })
    .catch(error => {
      console.error("Error:", error);
    });
});
