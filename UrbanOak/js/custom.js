// NAVBAR
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");
  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});


//  CART LOGIC 

let cart = [];

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2);
}

function renderCart() {
  const cartItemsEl = document.getElementById("cart-items");
  const cartTotalEl = document.getElementById("cart-total");
  const cartCountEl = document.getElementById("cart-count");

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCountEl.textContent = totalItems;
  cartCountEl.style.display = totalItems > 0 ? "flex" : "none";

  if (cart.length === 0) {
    cartItemsEl.innerHTML = `
      <div class="cart-empty">
        <i class="ri-shopping-cart-2-line"></i>
        <p>Your cart is empty</p>
      </div>`;
    cartTotalEl.textContent = "$0.00";
    return;
  }

  cartItemsEl.innerHTML = cart
    .map(
      (item) => `
    <div class="cart-item" data-name="${item.name}">
      <div class="cart-item-info">
        <h5>${item.name}</h5>
        <p>$${item.price.toFixed(2)}</p>
      </div>
      <div class="cart-item-controls">
        <button class="qty-btn" onclick="changeQty('${item.name}', -1)"><i class="ri-subtract-line"></i></button>
        <span>${item.qty}</span>
        <button class="qty-btn" onclick="changeQty('${item.name}', 1)"><i class="ri-add-line"></i></button>
        <button class="remove-btn" onclick="removeFromCart('${item.name}')"><i class="ri-delete-bin-line"></i></button>
      </div>
    </div>`
    )
    .join("");

  cartTotalEl.textContent = "$" + getCartTotal();
}

function addToCart(name, price) {
  const existing = cart.find((i) => i.name === name);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  renderCart();
  openCart();

  // Animate cart icon
  const cartIcon = document.getElementById("cart-icon");
  cartIcon.classList.add("bump");
  setTimeout(() => cartIcon.classList.remove("bump"), 400);
}

function changeQty(name, delta) {
  const item = cart.find((i) => i.name === name);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter((i) => i.name !== name);
  }
  renderCart();
}

function removeFromCart(name) {
  cart = cart.filter((i) => i.name !== name);
  renderCart();
}

function openCart() {
  document.getElementById("cart-sidebar").classList.add("open");
  document.getElementById("cart-overlay").classList.add("open");
}

function closeCart() {
  document.getElementById("cart-sidebar").classList.remove("open");
  document.getElementById("cart-overlay").classList.remove("open");
}

// Cart icon click
document.getElementById("cart-icon").addEventListener("click", () => {
  document.getElementById("cart-sidebar").classList.toggle("open");
  document.getElementById("cart-overlay").classList.toggle("open");
});

document.getElementById("cart-overlay").addEventListener("click", closeCart);
document.getElementById("cart-close-btn").addEventListener("click", closeCart);

// Wire up all "Add to Cart" buttons
document.querySelectorAll(".product-cards").forEach((card) => {
  const btn = card.querySelector("button");
  const name = card.querySelector("h4").textContent.trim();
  const priceText = card.querySelector("p").textContent.trim();
  const price = parseFloat(priceText.replace("$", ""));

  btn.addEventListener("click", () => addToCart(name, price));
});

// Init render
renderCart();


// SWIPER SECTION
const swiper = new Swiper(".swiper", {
  loop: true,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
});


// SCROLL REVEAL
const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".header-image img", {
  ...scrollRevealOption,
  origin: "right",
});

ScrollReveal().reveal(".header-content div", {
  duration: 1000,
  delay: 500,
});

ScrollReveal().reveal(".header-content h1", {
  ...scrollRevealOption,
  delay: 1000,
});

ScrollReveal().reveal(".header-content p", {
  ...scrollRevealOption,
  delay: 1500,
});

ScrollReveal().reveal(".deals-cards", {
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal(".about-image img", {
  ...scrollRevealOption,
  origin: "right",
});

ScrollReveal().reveal(".about-card", {
  duration: 1000,
  delay: 500,
});