const cart = [];

function addToCart(product) {
  cart.push(product);
  product.count++; // Increase the count of the selected product
  console.log(`Added ${product.name} to cart.`);
}

function showCart() {
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = `
    <h2>My Cart</h2>
    <div id="cart-content">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody id="cart-products">
        </tbody>
      </table>
      <button onclick="redirectToBillPage()">Bill</button>

    </div>
  `;

  const cartProducts = document.getElementById("cart-products");
  cartProducts.innerHTML = "";

  cart.forEach((product) => {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = product.Name;

    const priceCell = document.createElement("td");
    priceCell.textContent = product.price;

    const quantityCell = document.createElement("td");

    const decreaseButton = document.createElement("button");
    decreaseButton.textContent = "-";
    decreaseButton.addEventListener("click", () => decreaseQuantity(product));
    
    const quantityDisplay = document.createElement("span");
    quantityDisplay.textContent = product.fq;

    const increaseButton = document.createElement("button");
    increaseButton.textContent = "+";
    increaseButton.addEventListener("click", () => increaseQuantity(product));

    quantityCell.appendChild(decreaseButton);
    quantityCell.appendChild(quantityDisplay);
    quantityCell.appendChild(increaseButton);

    const totalCell = document.createElement("td");
    const total = product.price * product.fq;
    totalCell.textContent = total;

    const removeCell = document.createElement("td");
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => removeFromCart(product));
    removeCell.appendChild(removeButton);

    row.appendChild(nameCell);
    row.appendChild(priceCell);
    row.appendChild(quantityCell);
    row.appendChild(totalCell);
    row.appendChild(removeCell);

    cartProducts.appendChild(row);
  });
}


function removeFromCart(product) {
  const index = cart.indexOf(product);
  if (index !== -1) {
    cart.splice(index, 1);
    product.count--; // Decrease the count of the removed product
    showCart(); // Update the cart display
  }
}

function processPayment() {
  alert("Payment successful! Thank you for your purchase.");
  // Clear the cart and update the display
  cart.forEach((product) => {
    product.count = 0; // Reset the count of products in the cart
  });
  cart.length = 0; // Clear the cart array
  showCart();
}

function decreaseQuantity(product) {
  if (product.fq > 1) {
    product.fq--;
    showCart(); // Update the cart display
  }
}

function increaseQuantity(product) {
  product.fq++;
  showCart(); // Update the cart display
}

function redirectToBillPage() {
  window.location.href = "bill.html";
}

