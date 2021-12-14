let order = JSON.parse(localStorage.getItem("productChoose"));
let quantitySum = 0;
let priceSum = 0;
if (order === null) {
} else {
  let display = "";
  for (let i in order) {
    display += `<article class="cart__item" data-id="${order[i].idProduct}" data-color="${order[i].colorChoose}">
                  <div class="cart__item__img">
                    <img src="${order[i].imageUrl}" alt="${order[i].altTxt}">
                  </div>
                  <div class="cart__item__content">
                    <div class="cart__item__content__description">
                      <h2>${order[i].name}</h2>
                      <p>${order[i].colorChoose}</p>
                      <p>${order[i].price}</p>
                    </div>
                    <div class="cart__item__content__settings">
                      <div class="cart__item__content__settings__quantity">
                        <p>Qté : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${order[i].quantityChoose}">
                      </div>
                      <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                      </div>
                    </div>
                  </div>
                </article>`;
    document.querySelector("#cart__items").innerHTML = display;
    quantitySum += parseInt(`${order[i].quantityChoose}`);
    priceSum +=
      parseInt(`${order[i].price}`) * parseInt(`${order[i].quantityChoose}`);
  }
}
document.querySelector("#totalQuantity").innerHTML = quantitySum;
document.querySelector("#totalPrice").innerHTML = priceSum;

let del = document.querySelectorAll(".deleteItem");
for (let j = 0; j < del.length; j++) {
  del[j].addEventListener("click", (event) => {
    //On selectionne le produit auquel est lié le bouton supprimer
    let productSelect = order[j];
    //On garde dans le tableau tout les objets differents de celui de selectionner
    order = order.filter((item) => item !== productSelect);
    localStorage.setItem("productChoose", JSON.stringify(order));
    alert("l' ou les article(s) on bien été supprimer");
    //On refresh la page pour mettre à jour le DOM avec les nouvelles données
    location.reload();
  });
}
//Ecoute et modification des Quantités
let input = document.querySelectorAll(".itemQuantity");
for (let k = 0; k < del.length; k++) {
  input[k].addEventListener("click", (event) => {
    //On selectionne le produit auquel est lié l'input
    let productSelect = order[k];
    //On met la nouvelle valeur dans une variable
    newValue = event.target.value;
    //On modifie le DOM avec la nouvelle valeur
    input[k].setAttribute("value", `${newValue}`);
    //On modifie la valeur de quantité et on la réinjecte dans LocalStorage
    productSelect.quantityChoose = newValue;
    localStorage.setItem("productChoose", JSON.stringify(order));
    //On refresh la page pour mettre à jour le DOM avec les nouvelles données
    location.reload();
  });
}
