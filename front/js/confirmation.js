// Recuperation de l'id
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
//On insere l'id (qui correspond aux numeros de commande) dans le html
document.querySelector("#orderId").innerHTML = id;
localStorage.clear();
