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

function showCart() {
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = `
    <h2>My Cart</h2>
    <div id="cart-content"></div>
  `;
  showCart();
}