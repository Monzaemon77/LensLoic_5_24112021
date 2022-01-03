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
    let display = document.querySelector("#items");
    //Pour chaque Produit du tableau de l'API on créé un bloc html (avec les données qui sont ajoutés dynamiquement) qui sera injecté dans la variable display
    for (products of data) {
      let a = document.createElement("a");
      a.setAttribute("href", `./product.html?id=${products._id}`);
      display.appendChild(a);
      let article = document.createElement("article");
      a.appendChild(article);
      let img = document.createElement("img");
      img.setAttribute("src", `${products.imageUrl}`);
      img.setAttribute("alt", `${products.altTxt}`);
      article.appendChild(img);
      let h3 = document.createElement("h3");
      h3.className = `productName`;
      h3.textContent = `${products.name}`;
      article.appendChild(h3);
      let p = document.createElement("p");
      p.className = `productDescription`;
      p.textContent = `${products.description}`;
      article.appendChild(p);
    }
  })
  .catch(function (err) {});
