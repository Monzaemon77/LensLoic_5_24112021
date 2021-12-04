fetch("http://localhost:3000/api/products")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (data) {
    let display = "";
    for (products of data) {
      display += `<a href="./product.html?id=${products._id}"><article><img src="${products.imageUrl}" alt="${products.altTxt}"><h3 class="productName">${products.name}</h3><p class="productDescription">${products.description}</p></article></a>`;
    }
    document.querySelector("#items").innerHTML = display;
  })
  .catch(function (err) {});
