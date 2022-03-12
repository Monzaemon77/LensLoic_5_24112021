let order = JSON.parse(localStorage.getItem("productChoose"));
let quantitySum = 0;
let priceSum = 0;
if (order === null) {
} else {
  //je créé une variable display qui contiendra le code html
  let display = document.querySelector("#cart__items");
  //Pour chaque objet du tableau order qui a pour key ProductChoose(qui correspond aux produits ajoutés par l'user), on ajoute du code html dans la variable display avec les information des produits ajoutés dynamiquement
  for (let i in order) {
    let article = document.createElement("article");
    article.className = "cart__item";
    article.setAttribute("data-id", `${order[i].idProduct}`);
    article.setAttribute("data-color", `${order[i].colorChoose}`);
    display.appendChild(article);
    let div = document.createElement("div");
    div.className = "cart__item__img";
    article.appendChild(div);
    let img = document.createElement("img");
    img.setAttribute("src", `${order[i].imageUrl}`);
    img.setAttribute("alt", `${order[i].altTxt}`);
    div.appendChild(img);
    let div2 = document.createElement("div");
    div2.className = "cart__item__content";
    article.appendChild(div2);
    let div3 = document.createElement("div");
    div3.className = "cart__item__content__description";
    div2.appendChild(div3);
    let h2 = document.createElement("h2");
    h2.textContent = `${order[i].name}`;
    div3.appendChild(h2);
    let p = document.createElement("p");
    p.textContent = `${order[i].colorChoose}`;
    div3.appendChild(p);
    let p2 = document.createElement("p");
    p2.textContent = `${order[i].price}`;
    div3.appendChild(p2);
    let div4 = document.createElement("div");
    div4.className = "cart__item__content__settings";
    div2.appendChild(div4);
    let div5 = document.createElement("div");
    div5.className = "cart__item__content__settings__quantity";
    div4.appendChild(div5);
    let p__qté = document.createElement("p");
    p__qté.textContent = "Qté : ";
    div5.appendChild(p__qté);
    let input = document.createElement("input");
    input.setAttribute("type", "number");
    input.className = "itemQuantity";
    input.setAttribute("name", "itemQuantity");
    input.setAttribute("min", 1);
    input.setAttribute("max", 100);
    input.setAttribute("value", `${order[i].quantityChoose}`);
    div5.appendChild(input);
    let div6 = document.createElement("div");
    div6.className = "cart__item__content__settings__delete";
    div4.appendChild(div6);
    let p__del = document.createElement("p");
    p__del.className = "deleteItem";
    p__del.textContent = "Supprimer";
    div6.appendChild(p__del);
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
    document.querySelector("#firstNameErrorMsg").textContent = "";
    return true;
  } else {
    document.querySelector("#firstNameErrorMsg").textContent =
      "Le Prénom(entre 2 et 20 caractères) n'est pas valide. Les chiffres et symboles(excepté le - et ') ne sont pas autorisés";
    return false;
  }
};
const lastNameControl = function (userLastName) {
  if (regExControl.test(userLastName.value)) {
    document.querySelector("#lastNameErrorMsg").textContent = "";
    return true;
  } else {
    document.querySelector("#lastNameErrorMsg").textContent =
      "Le Prénom(entre 2 et 20 caractères) n'est pas valide. Les chiffres et symboles(excepté le - et ') ne sont pas autorisés";
    return false;
  }
};
const addressControl = function (userAddress) {
  if (regExControlAddress.test(userAddress.value)) {
    document.querySelector("#addressErrorMsg").textContent = "";
    return true;
  } else {
    document.querySelector("#addressErrorMsg").textContent =
      "L'adresse n'est pas valide. Les symboles ne sont pas autorisés";
    return false;
  }
};
const cityControl = function (userCity) {
  if (regExControl.test(userCity.value)) {
    document.querySelector("#cityErrorMsg").textContent = "";
    return true;
  } else {
    document.querySelector("#cityErrorMsg").textContent =
      "La Ville(entre 2 et 20 caractères) n'est pas valide. Les chiffres et symboles ne sont pas autorisés";
    return false;
  }
};
const emailControl = function (userEmail) {
  if (regExControlEMail.test(userEmail.value)) {
    document.querySelector("#emailErrorMsg").textContent = "";
    return true;
  } else {
    document.querySelector("#emailErrorMsg").textContent =
      "L'Email n'est pas valide. Format accepté : quelquechose@domaine.extension";
    return false;
  }
};
const btnForm = document.querySelector("#order");
//On ecoute le click du bouton commander
btnForm.addEventListener("click", (e) => {
  //On recupere les données saisie par l'user
  const contact = {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    address: document.querySelector("#address").value,
    city: document.querySelector("#city").value,
    email: document.querySelector("#email").value,
  };
  e.preventDefault();
  //On recupere l'id de chaque produit et on l'insert dans un tableau
  products = [];
  for (let k = 0; k < order.length; k++) {
    products.push(order[k].idProduct);
  }
  // On crée un objet regroupant les produits choisis et les data du formulaire
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
