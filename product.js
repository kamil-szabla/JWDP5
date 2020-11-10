const img = document.getElementById("prod-img");
const select = document.getElementById("lenseSelect");
const addBtn = document.getElementById("addProd");
const prodName = document.getElementById("prod-name");
const price = document.getElementById("price");

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
          reject("Somehting went wrong - API Request failed!");
        }
      }
    };
  });
};

function showProduct(response) {
  img.setAttribute("src", response.imageUrl);

  //  Append right side section (details, etc....)
  document.getElementById("description").textContent = response.description;
  prodName.textContent = response.name;
  price.textContent = response.price / 100 + "$";

  for (let i in response.lenses) {
    const newOption = document.createElement("option");
    newOption.textContent = response.lenses[i];
    select.appendChild(newOption);
  }
}

addBtn.addEventListener("click", ($event) => {
  $event.preventDefault();
  localStorage.setItem("Name", prodName.textContent);
  localStorage.setItem("Price", price.textContent);
  localStorage.setItem("Lense", select.value);
  console.log(localStorage);
});

init = async () => {
  const requestPromise = makeRequest();
  const response = await requestPromise;

  showProduct(response);
};

init();
