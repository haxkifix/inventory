document.addEventListener("DOMContentLoaded", function () {
    const categoryProducts = document.getElementById("user-profile");
  
    // Fetch products from the PHP script
    fetch("get_profile.php")
      .then((response) => response.json())
      .then((data) => {
        categoryProducts.innerHTML = ""; // Clear previous content
  
        data.forEach((users) => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${users.username}</td>
            <td>${users.PhoneNumber}</td>
          `;

          categoryProducts.appendChild(row);
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  });
  