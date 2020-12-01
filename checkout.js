const showPrice = document.getElementById("totalPrice");
const orderId = document.getElementById("orderId");
const backBtn = document.getElementById("backBtn");

const localStorageContent = localStorage.getItem("cart");
cartContent = JSON.parse(localStorageContent);

function orderSummary() {
  let totalCost = 0;
  for (let i = 0; i < cartContent.length; i++) {
    let price = cartContent[i].priceContent;
    let newPrice = parseInt(price);

    totalCost = totalCost + newPrice;
  }
  showPrice.textContent = "Total cost of your order: " + totalCost + " $";
}

function idGenerate() {
  let newRandom = (
    Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
  ).toUpperCase();

  orderId.textContent = "Your order ID: " + newRandom;
  console.log(newRandom);
}

backBtn.addEventListener("click", () => {
  localStorage.removeItem("cart");
});

orderSummary();
idGenerate();
