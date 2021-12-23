let order = JSON.parse(localStorage.getItem("productChoose"));
let quantitySum = 0;
let priceSum = 0;
if (order === null) {
} else {
  //je créé une variable display qui contiendra le code html
  let display = "";
  //Pour chaque objet du tableau order qui a pour key ProductChoose(qui correspond aux produits ajoutés par l'user), on ajoute du code html dans la variable display avec les information des produits ajoutés dynamiquement
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
    //On fait le calcul des articles du panier ainsi que le prix total
    quantitySum += parseInt(`${order[i].quantityChoose}`);
    priceSum +=
      parseInt(`${order[i].price}`) * parseInt(`${order[i].quantityChoose}`);
  }
}
//On ajoute le resultat des calculs precedent au html
document.querySelector("#totalQuantity").innerHTML = quantitySum;
document.querySelector("#totalPrice").innerHTML = priceSum;
//On selectionne le bouton supprimer du produit (que j'ai mis dans une variable del)
let del = document.querySelectorAll(".deleteItem");
//Pour chaque produit du panier on ecoute le bouton supprimer del
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
    value = event.target.value;
    //On modifie la valeur de quantité et on la réinjecte dans LocalStorage
    productSelect.quantityChoose = value;
    localStorage.setItem("productChoose", JSON.stringify(order));
    //On refresh la page pour mettre à jour le DOM avec les nouvelles données
    location.reload();
  });
}
const btnForm = document.querySelector("#order");
//On recupere les données saisie par l'user
const contact = {
  firstName: document.querySelector("#firstName").value,
  lastName: document.querySelector("#lastName").value,
  address: document.querySelector("#address").value,
  city: document.querySelector("#city").value,
  email: document.querySelector("#email").value,
};
//Verification des data saisies
let form = document.querySelector(".cart__order__form");
//On definie les regex
const regExControl = new RegExp(
  "^[a-zA-Z]+([ -']?[a-zA-Z]+[ -']?[a-zA-Z]+[ -']?)[a-zA-Z]+$"
);
const regExControlAddress = new RegExp("^[#.0-9a-zA-Z ,-]+$");
const regExControlEMail = new RegExp(
  "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
);
//On ecoute les input
form.firstName.addEventListener("change", function () {
  firstNameControl(this);
});
form.lastName.addEventListener("change", function () {
  lastNameControl(this);
});
form.address.addEventListener("change", function () {
  addressControl(this);
});
form.city.addEventListener("change", function () {
  cityControl(this);
});
form.email.addEventListener("change", function () {
  emailControl(this);
});
//On definie les fonctions qui sont utilisés dans l'ecoute des input
const firstNameControl = function (userFirstName) {
  if (regExControl.test(userFirstName.value)) {
    document.querySelector("#firstNameErrorMsg").innerHTML = "";
    return true;
  } else {
    document.querySelector("#firstNameErrorMsg").innerHTML =
      "Le Prénom(entre 2 et 20 caractères) n'est pas valide. Les chiffres et symboles(excepté le - et ') ne sont pas autorisés";
    return false;
  }
};
const lastNameControl = function (userLastName) {
  if (regExControl.test(userLastName.value)) {
    document.querySelector("#lastNameErrorMsg").innerHTML = "";
    return true;
  } else {
    document.querySelector("#lastNameErrorMsg").innerHTML =
      "Le Prénom(entre 2 et 20 caractères) n'est pas valide. Les chiffres et symboles(excepté le - et ') ne sont pas autorisés";
    return false;
  }
};
const addressControl = function (userAddress) {
  if (regExControlAddress.test(userAddress.value)) {
    document.querySelector("#addressErrorMsg").innerHTML = "";
    return true;
  } else {
    document.querySelector("#addressErrorMsg").innerHTML =
      "L'adresse n'est pas valide. Les symboles ne sont pas autorisés";
    return false;
  }
};
const cityControl = function (userCity) {
  if (regExControl.test(userCity.value)) {
    document.querySelector("#cityErrorMsg").innerHTML = "";
    return true;
  } else {
    document.querySelector("#cityErrorMsg").innerHTML =
      "La Ville(entre 2 et 20 caractères) n'est pas valide. Les chiffres et symboles ne sont pas autorisés";
    return false;
  }
};
const emailControl = function (userEmail) {
  if (regExControlEMail.test(userEmail.value)) {
    document.querySelector("#emailErrorMsg").innerHTML = "";
    return true;
  } else {
    document.querySelector("#emailErrorMsg").innerHTML =
      "L'Email n'est pas valide. Format accepté : quelquechose@domaine.extension";
    return false;
  }
};
// On crée un objet regroupant les produits choisis et les data du formulaire
btnForm.addEventListener("click", (e) => {
  e.preventDefault();
  //On recupere l'id de chaque produit et on l'insert dans un tableau
  products = [];
  for (let k = 0; k < order.length; k++) {
    products.push(order[k].idProduct);
  }
  const dataOrder = {
    contact,
    products,
  };
  //On créer la fonction pour envoyer les données au server et aller à la page confirmation
  function sendServer(dataOrder) {
    const promise = fetch(`http://localhost:3000/api/products/order`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataOrder),
    });
    promise.then(async (response) => {
      try {
        const contenu = await response.json();
        if (response.ok) {
          //On met le numero de commande en id dans l'URL
          window.location.href = `../html/confirmation.html?id=${contenu.orderId}`;
        } else {
          //Affichage d'une alerte en cas de probleme avec le serveur
          alert(`Probleme avec le serveur : erreur ${response.status}`);
        }
      } catch (err) {
        alert(`Erreur qui vient du catch() ${err}`);
      }
    });
  }
  if (
    firstNameControl(form.firstName) &&
    lastNameControl(form.lastName) &&
    addressControl(form.address) &&
    cityControl(form.city) &&
    emailControl(form.email)
  ) {
    localStorage.setItem("contact", JSON.stringify(contact));
    localStorage.setItem("dataOrder", JSON.stringify(dataOrder));
    sendServer(dataOrder);
  } else {
    alert("Le Formulaire n'est pas valide");
  }
});
