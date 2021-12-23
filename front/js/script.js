//On recupere les informations produits de l'API
fetch("http://localhost:3000/api/products")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  //On obtient une reponse avec les données des produits
  .then(function (data) {
    //Creation d'une variable qui contiendra le code html à ajouter pour afficher les produits
    let display = "";
    //Pour chaque Produit du tableau de l'API on créé un bloc html (avec les données qui sont ajoutés dynamiquement) qui sera injecté dans la variable display
    for (products of data) {
      display += `<a href="./product.html?id=${products._id}"><article><img src="${products.imageUrl}" alt="${products.altTxt}"><h3 class="productName">${products.name}</h3><p class="productDescription">${products.description}</p></article></a>`;
    }
    //J'insere la variable display dans la balise section qui pour id Items
    document.querySelector("#items").innerHTML = display;
  })
  .catch(function (err) {});
