const table = document.getElementById("cartTable");
const totalPrice = document.getElementById("summary");
const localStorageContent = localStorage.getItem("cart");
const localStorageOrder = localStorage.getItem("data");

let fName = document.getElementById("firstName");
let lName = document.getElementById("lastName");
let address = document.getElementById("address");
let city = document.getElementById("city");
let email = document.getElementById("email");

cartContent = JSON.parse(localStorageContent);

// Create cart content based on previous selection
function tableItems() {
  for (let i = 0; i < cartContent.length; i++) {
    const newTableRow = document.createElement("tr");
    const newTableHeader = document.createElement("td");
    const newTableCell = document.createElement("td");
    const newTableCell2 = document.createElement("td");
    const newTableCell3 = document.createElement("td");
    const newDiv = document.createElement("div");
    const newImage = document.createElement("img");
    const newPara = document.createElement("p");
    const newIcon = document.createElement("ion-icon");
    const newButton = document.createElement("a");

    newTableRow.append(
      newTableHeader,
      newTableCell,
      newTableCell2,
      newTableCell3
    );
    newTableHeader.setAttribute("scope", "row");
    newTableHeader.classList.add("border-0");
    newTableHeader.append(newDiv);
    newDiv.classList.add("p-2");
    newDiv.append(newImage, newPara);
    newImage.setAttribute("src", cartContent[i].itemImage);
    newImage.setAttribute("style", "width: 70px");
    newPara.textContent = cartContent[i].prodContent;
    newPara.classList.add("d-inline-block", "m-2", "font-weight-light");
    newTableCell.textContent = cartContent[i].priceContent;
    newTableCell.classList.add("border-0", "align-middle");
    newTableCell2.textContent = cartContent[i].selectValue;
    newTableCell2.classList.add("border-0", "align-middle");
    newButton.setAttribute("type", "button");
    newButton.classList.add("btn", "btn-sm", "btn-light", "removeBtn");
    newButton.textContent = "Remove";
    newTableCell3.append(newButton);
    newTableCell3.classList.add("border-0", "align-middle");
    newIcon.setAttribute("name", "trash");
    newTableCell3.classList.add("text-center");
    table.appendChild(newTableRow);

    // Remove item from cart
    newButton.addEventListener("click", () => {
      if (cartContent.length > 0) {
        cartContent.splice(i, 1);
        location.reload();
      } else {
        cartContent.splice(0, 1);
        location.reload();
      }
      newCart = JSON.stringify(cartContent);
      localStorage.setItem("cart", newCart);
    });
  }
}

// Calculate total value of order
function orderSummary() {
  let totalCost = 0;
  for (let i = 0; i < cartContent.length; i++) {
    let price = cartContent[i].priceContent;
    let newPrice = parseInt(price);

    totalCost = totalCost + newPrice;
  }
  totalPrice.textContent = totalCost + " $";
}

(function sumbitForm() {
  "use strict";

  window.addEventListener(
    "load",
    function () {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName("needs-validation");

      // Loop over them and prevent submission
      Array.prototype.filter.call(forms, function (form) {
        form.addEventListener(
          "submit",
          function (event) {
            event.preventDefault();

            if (cartContent < 1) {
              event.preventDefault();
              event.stopPropagation();
              alert("Your cart is empty");
            } else if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add("was-validated");

            let formInput = document.getElementById("myForm");
            let formData = new FormData(formInput);
            formData.append("firstName", fName.value);
            formData.append("lastName", lName.value);
            formData.append("address", address.value);
            formData.append("city", city.value);
            formData.append("email", email.value);

            let contact = {
              firstName: fName.value,
              lastName: lName.value,
              address: address.value,
              city: city.value,
              email: email.value,
            };

            var xhr = new XMLHttpRequest();
            xhr.open("POST", "/order", true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(contact);
            console.log(contact);
          },
          false
        );
      });
    },
    false
  );
})();

tableItems();
orderSummary();
