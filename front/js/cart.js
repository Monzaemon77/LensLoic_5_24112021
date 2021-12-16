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
    //On refresh la page pour mettre à jour le DOM avec les nouvelles données
    location.reload();
  });
}
//Ecoute et modification des Quantités
let input = document.querySelectorAll(".itemQuantity");
for (let k = 0; k < input.length; k++) {
  input[k].addEventListener("click", (event) => {
    //On selectionne le produit auquel est lié l'input
    let productSelect = order[k];
    //On met la nouvelle valeur dans une variable
    newValue = event.target.value;
    //On modifie la valeur de quantité et on la réinjecte dans LocalStorage
    productSelect.quantityChoose = newValue;
    localStorage.setItem("productChoose", JSON.stringify(order));
    //On refresh la page pour mettre à jour le DOM avec les nouvelles données
    location.reload();
  });
}

//On recupere les données saisie par l'user
const btnForm = document.querySelector("#order");
const contact = {
  firstName: document.querySelector("#firstName").value,
  lastName: document.querySelector("#lastName").value,
  address: document.querySelector("#address").value,
  city: document.querySelector("#city").value,
  email: document.querySelector("#email").value,
};
//Verification des data saisies
let form = document.querySelector(".cart__order__form");
const regExControl = (value) => {
  return /^[a-zA-Z]+([ \-']?[a-zA-Z]+[ \-']?[a-zA-Z]+[ \-']?)[a-zA-Z]+$/.test(
    value
  );
};
const regExControlAddress = (value) => {
  return /^[#.0-9a-zA-Z\s,-]+$/.test(value);
};
const regExControlEMail = (value) => {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
};
function firstNameControl() {
  const prenom = contact.firstName;
  if (regExControl(prenom)) {
    return true;
  } else {
    document.querySelector("#firstNameErrorMsg").innerHTML =
      "Le Prénom(entre 2 et 20 caractères) n'est pas valide. Les chiffres et symboles(excepté le - et ') ne sont pas autorisés";
    return false;
  }
}
function lastNameControl() {
  const nom = contact.lastName;
  if (regExControl(nom)) {
    return true;
  } else {
    document.querySelector("#lastNameErrorMsg").innerHTML =
      "Le Nom(entre 2 et 20 caractères) n'est pas valide. Les chiffres et symboles ne sont pas autorisés";
    return false;
  }
}
function addressControl() {
  const adresse = contact.address;
  if (regExControlAddress(adresse)) {
    return true;
  } else {
    document.querySelector("#addressErrorMsg").innerHTML =
      "L'adresse n'est pas valide. Les symboles ne sont pas autorisés";
    return false;
  }
}
function cityControl() {
  const city = contact.city;
  if (regExControl(city)) {
    return true;
  } else {
    document.querySelector("#cityErrorMsg").innerHTML =
      "La Ville(entre 2 et 20 caractères) n'est pas valide. Les chiffres et symboles ne sont pas autorisés";
    return false;
  }
}
function emailControl() {
  const email = contact.email;
  if (regExControlEMail(email)) {
    return true;
  } else {
    document.querySelector("#emailErrorMsg").innerHTML =
      "L'Email n'est pas valide. Format accepté : quelquechose@domaine.extension";
    return false;
  }
}

// On crée un objet regroupant les produits choisis et les data du formulaire
btnForm.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    firstNameControl() &&
    lastNameControl() &&
    cityControl() &&
    addressControl() &&
    emailControl()
  ) {
    const dataOrder = {
      order,
      contact,
    };
    localStorage.setItem("contact", JSON.stringify(contact));
    localStorage.setItem("dataOrder", JSON.stringify(dataOrder));
  } else {
    alert("Le Formulaire n'est pas valide, modifié et rechargé la page");
    //setTimeout("location.reload(true);", 5000);
  }
});
