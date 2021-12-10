// Recuperation de l'id
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

// Recuperation des data du produit grace à l'id
fetch(`http://localhost:3000/api/products/${id}`)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  // Utilisation des data dans le html pour afficher le produit sur la page
  .then(function (product) {
    document.title = `${product.name}`;
    document.querySelector(
      ".item__img"
    ).innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}"></img>`;
    document.querySelector("#title").innerHTML = `${product.name}`;
    document.querySelector("#price").innerHTML = `${product.price}`;
    document.querySelector("#description").innerHTML = `${product.description}`;
    for (color of product.colors) {
      option_color = document.createElement("option");
      option_color.setAttribute("value", `${color}`);
      option_color.innerHTML = `${color}`;
      document.querySelector("#colors").appendChild(option_color);
    }
  })
  .catch(function (err) {});
// Recuperation des données saisie par l'user
const quantity_product = document.querySelector("#quantity");
const colorForm = document.querySelector("#colors");
const send = document.querySelector("#addToCart");
send.addEventListener("click", (event) => {
  const quantity = quantity_product.value;
  const choose = colorForm.value;
  let option_product = {
    idProduct: id,
    colorChoose: choose,
    quantityChoose: quantity,
  };
  // Verification du choix de l'user
  if (choose == "") {
    alert((message = "Veuillez choisir une couleur"));
    return false;
  } else if (quantity == "0") {
    alert((message = "veuillez choisir une quantité"));
    return false;
  }
  // Fonction affichage d'une alerte
  const valid = () => {
    alert((message = "Article(s) ajouté(s) au(x) Panier"));
  };

  // Recuperation et stockage des data saisie dans le local storage

  // Verifie si y a deja un panier
  let order = JSON.parse(localStorage.getItem("product"));
  // Vrai
  if (order) {
    //Verifie si l'id ET la couleur sont deja dans le tableau (product)
    const InArray = order.find(
      (el) =>
        el.idProduct === option_product.idProduct &&
        el.colorChoose === option_product.colorChoose
    );
    // Condition Vrai
    if (InArray) {
      let newQuantity =
        parseInt(option_product.quantityChoose) +
        parseInt(InArray.quantityChoose);
      InArray.quantityChoose = newQuantity;
      localStorage.setItem("product", JSON.stringify(order));
      valid();
    }
    // Condition Fausse
    else {
      order.push(option_product);
      localStorage.setItem("product", JSON.stringify(order));
      valid();
    }
  }
  // Faux, on crée le panier et on y met le produit
  else {
    order = [];
    order.push(option_product);
    localStorage.setItem("product", JSON.stringify(order));
    valid();
  }
});
