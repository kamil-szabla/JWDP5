// SELECTORS
const showPrice = document.getElementById("totalPrice");
const orderId = document.getElementById("orderId");
const backBtn = document.getElementById("backBtn");

let order = sessionStorage.getItem("data");
const localStorageContent = localStorage.getItem("cart");
cartContent = JSON.parse(localStorageContent);

// Shows total cost of order and order ID
function orderSummary() {
  let totalCost = 0;
  for (let i = 0; i < cartContent.length; i++) {
    let price = cartContent[i].priceContent;
    let newPrice = parseInt(price);

    totalCost = totalCost + newPrice;
  }
  showPrice.textContent = "Total cost of your order: " + totalCost + " $";
  orderId.textContent = "Your order ID: " + order;
}

backBtn.addEventListener("click", () => {
  sessionStorage.removeItem("data");
  localStorage.removeItem("cart");
});

orderSummary();
