// SELECTORS
const addBtn = document.getElementById("add-product");
const submitBtn = document.getElementById("sumbit");
const cards = document.getElementById("prodList");
const select = document.getElementsByClassName("prodLink");
const prod = document.querySelectorAll("prod");

// REQUEST TO PULL DATA FROM API
makeRequest = () => {
  return new Promise((resolve, reject) => {
    let apiRequest = new XMLHttpRequest();

    apiRequest.open("GET", "http://localhost:3000/api/cameras/");
    apiRequest.send();
    apiRequest.onreadystatechange = () => {
      if (apiRequest.readyState === 4) {
        if (apiRequest.status === 200) {
          resolve(JSON.parse(apiRequest.response));
        } else {
          reject(alert("Ops... something went wrong!"));
        }
      }
    };
  });
};

// FUNCTION CREATES PRODUCTS ON THE WEBSITE, TAKES DATA FROM 'GET' REQUEST ABOVE
addProduct = (response) => {
  for (let i in response) {
    const newDiv = document.createElement("div");
    const newLink = document.createElement("a");
    const newPara = document.createElement("p");
    const newPara1 = document.createElement("p");
    const newImg = document.createElement("img");
    newDiv.classList.add("col-lg-6", "prod");
    newDiv.append(newLink);
    newLink.id = response[i]._id;
    newLink.setAttribute("href", "product.html?id=" + response[i]._id);
    newLink.classList.add("prodLink");
    newLink.append(newPara1, newImg, newPara);
    newImg.setAttribute("src", response[i].imageUrl);
    newPara1.setAttribute("id", "prod-desc");
    newPara1.textContent = response[i].name;
    cards.appendChild(newDiv);
  }
};

// ASYNC FUNCTION WAITS FOR THE REQUEST RESPONSE, THEN PASS IT TO addProduct() FUNCTION
init = async () => {
  try {
    const requestPromise = makeRequest();
    const response = await requestPromise;

    addProduct(response);
  } catch (error) {
    alert(error.value);
  }
};

init();
