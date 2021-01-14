// SELECTORS
const img = document.getElementById("prod-img");
const select = document.getElementById("lenseSelect");
const addBtn = document.getElementById("addProd");
const prodName = document.getElementById("prod-name");
const price = document.getElementById("price");

// GET REQUEST TAKES ID OF ITEM FROM URL TO GET ALL THE INFO ABOUT THE ITEM
makeRequest = () => {
  return new Promise((resolve, reject) => {
    const qureyString = window.location.search;
    const urlParam = new URLSearchParams(qureyString);
    const id = urlParam.get("id");

    let apiRequest = new XMLHttpRequest();

    apiRequest.open("GET", "http://localhost:3000/api/cameras/" + id);
    apiRequest.send();
    apiRequest.onreadystatechange = () => {
      if (apiRequest.readyState === 4) {
        if (apiRequest.status === 200) {
          resolve(JSON.parse(apiRequest.response));
        } else {
          reject(alert("Somehting went wrong - API Request failed!"));
        }
      }
    };
  });
};

// GENERATE SITE CONTENT
function showProduct(response) {
  img.setAttribute("src", response.imageUrl);
  img.setAttribute("id", response._id);

  //  Append right side section (details, price and lense options)
  document.getElementById("description").textContent = response.description;
  prodName.textContent = response.name;
  price.textContent = response.price / 100 + "$";

  // LENSE SELECTIONS
  for (let i in response.lenses) {
    const newOption = document.createElement("option");
    newOption.textContent = response.lenses[i];
    select.appendChild(newOption);
  }
}

// Add product to the local storage
addBtn.addEventListener("click", (response) => {
  let prodContent = prodName.textContent;
  let priceContent = price.textContent;
  let selectValue = select.value;
  let itemImage = img.src;
  let prodId = img.id;

  const localStorageContent = localStorage.getItem("cart");

  let cart;
  let data;
  if (localStorageContent === null) {
    cart = [];
  } else {
    cart = JSON.parse(localStorageContent);
  }

  cart.push({ prodContent, priceContent, selectValue, itemImage, prodId });
  localStorage.setItem("cart", JSON.stringify(cart));
});

init = async () => {
  const requestPromise = makeRequest();
  const response = await requestPromise;

  showProduct(response);
};

init();
