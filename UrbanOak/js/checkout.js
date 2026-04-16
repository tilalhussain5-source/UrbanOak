const form = document.getElementById("checkoutForm");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const postal = document.getElementById("postal").value.trim();

  // Basic validation
  if (!name || !phone || !address) {
    alert("Please fill all required fields");
    return;
  }

  // Save order (optional)
  const orderData = {
    name,
    phone,
    address,
    postal,
    payment: "Cash on Delivery"
  };

  localStorage.setItem("order", JSON.stringify(orderData));

  // Redirect
  window.location.href = "thankyou.html";
});