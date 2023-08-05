let menuCollapsed = false;

function toggleMenu() {
  const sidebar = document.getElementById("sidebar");
  const menuHeader = document.querySelector(".sidebar h2");
  const menuText = document.querySelector(".sidebar h2 .menu-text");
  const menuLinks = document.querySelectorAll(".sidebar ul li a");
  const content = document.getElementById("content");

  if (menuCollapsed) {
    sidebar.style.flexBasis = "20%";
    menuHeader.style.marginBottom = "20px";
    menuText.style.display = "inline";

    menuLinks.forEach(link => {
      link.style.display = "inline-block";
    });
    content.style.flex = "1";
  } else {
    sidebar.style.flexBasis = "4%";
    menuHeader.style.marginBottom = "0";
    menuText.style.display = "none";

    menuLinks.forEach(link => {
      link.style.display = "none";
    });
    content.style.flex = "auto";
  }

  menuCollapsed = !menuCollapsed;
}

function showDashboard() {

  // Load the dashboard.html content into the #content div
  const contentDiv = document.getElementById("content");
  fetch("dashboard.html")
    .then(response => response.text())
    .then(html => {
      contentDiv.innerHTML = html;
      // Fetch data and display the line graph
      const data = {
        labels: ['c1','c2','c3','c4','c5'],
        datasets: [{
          label: 'Quantity',
          data: [20, 30, 25, 40, 50],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      };

      const ctx = document.getElementById('lineChart').getContext('2d');
      const lineChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    })
    .catch(error => {
      console.error("Error loading dashboard content:", error);
    });
}

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
  const newProduct = {
    id: document.getElementById("product-id").value,
    name: document.getElementById("product-name").value,
    description: document.getElementById("product-description").value,
    status: document.getElementById("product-status").value,
    price: document.getElementById("product-price").value,
    count: document.getElementById("product-count").value,
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


