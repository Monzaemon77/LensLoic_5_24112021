//Recuperation de l'id
const url = new URL(window.location.href);

const id = url.searchParams.get("id");

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
    for (colors of product.colors) {
      option_color = document.createElement("option");
      option_color.innerHTML = `<option value="${colors}">${colors}</option>`;
      document.querySelector("#colors").appendChild(option_color);
    }
  })
  .catch(function (err) {});
