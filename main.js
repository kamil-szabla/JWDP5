const addBtn = document.getElementById("add-product");
const submitBtn = document.getElementById("sumbit");
const cards = document.getElementById("prodList");
const select = document.getElementsByClassName("prodLink");
const prod = document.querySelectorAll("prod");

const items = [
  {
    lenses: ["35mm 1.4", "50mm 1.6"],
    _id: "5be1ed3f1c9d44000030b061",
    name: "Zurss 50S",
    price: 49900,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageUrl: "http://localhost:3000/images/vcam_1.jpg",
  },
  {
    lenses: ["50mm 1.8", "60mm 2.8", "24-60mm 2.8/4.5"],
    _id: "5be1ef211c9d44000030b062",
    name: "Hirsch 400DTS",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    price: 309900,
    imageUrl: "http://localhost:3000/images/vcam_2.jpg",
  },
  {
    lenses: ["25mm 4.5"],
    _id: "5be9bc241c9d440000a730e7",
    name: "Franck JS 105",
    price: 209900,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageUrl: "http://localhost:3000/images/vcam_3.jpg",
  },
  {
    lenses: ["50mm 1.7", "35mm 1.4"],
    _id: "5be9c4471c9d440000a730e8",
    name: "Kuros TTS",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    price: 159900,
    imageUrl: "http://localhost:3000/images/vcam_4.jpg",
  },
  {
    lenses: ["50mm 1.4", "35mm 1.8", "28-200mm 2.8/4.5"],
    _id: "5be9c4c71c9d440000a730e9",
    name: "Katatone",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    price: 59900,
    imageUrl: "http://localhost:3000/images/vcam_5.jpg",
  },
];

// Disabling form submissions if there are invalid fields
(function () {
  "use strict";

  window.addEventListener(
    "load",
    function () {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName("needs-validation");

      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener(
          "submit",
          function (event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add("was-validated");
          },
          false
        );
      });
    },
    false
  );
})();

// Create products list in collection section based on items object
// (function addProduct() {
//   for (let i = 0; i < items.length; i++) {
//     const newDiv = document.createElement("div");
//     const newLink = document.createElement("a");
//     const newPara = document.createElement("p");
//     const newPara1 = document.createElement("p");
//     const newImg = document.createElement("img");
//     newDiv.classList.add("col-lg-6", "prod" /*, "wow", "fadeInUp" */);
//     newDiv.id = items[i]._id;
//     newDiv.setAttribute("data-wow-delay", "0.5s");
//     newDiv.append(newLink);
//     newLink.id = items[i]._id;
//     newLink.setAttribute("href", "product.html?id=" + items[i]._id);
//     newLink.classList.add("prodLink");
//     newLink.append(newPara1, newImg, newPara);
//     newPara.setAttribute("id", "price");
//     newPara.textContent = "USD " + items[i].price / 100 + "$";
//     newImg.setAttribute("src", items[i].imageUrl);
//     newPara1.setAttribute("id", "prod-desc");
//     newPara1.textContent = items[i].name;
//     cards.appendChild(newDiv);
//   }
// })();

// for (let i = 0; i < items.length; i++) {
//   select[i].addEventListener("click", ($event) => {
//     makeRequest();
//   });
// }

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
          reject("Ops... something went wrong!");
        }
      }
    };
  });
};

addProduct = (response) => {
  for (let i in response) {
    const newDiv = document.createElement("div");
    const newLink = document.createElement("a");
    const newPara = document.createElement("p");
    const newPara1 = document.createElement("p");
    const newImg = document.createElement("img");
    newDiv.classList.add("col-lg-6", "prod" /*, "wow", "fadeInUp" */);
    newDiv.setAttribute("data-wow-delay", "0.5s");
    newDiv.append(newLink);
    newLink.id = response[i]._id;
    newLink.setAttribute("href", "product.html?id=" + response[i]._id);
    newLink.classList.add("prodLink");
    newLink.append(newPara1, newImg, newPara);
    // newPara.setAttribute("id", "price");
    // newPara.textContent = "USD " + response[i].price / 100 + "$";
    newImg.setAttribute("src", response[i].imageUrl);
    newPara1.setAttribute("id", "prod-desc");
    newPara1.textContent = response[i].name;
    cards.appendChild(newDiv);
  }
};

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
