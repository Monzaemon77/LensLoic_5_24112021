// Recuperation de l'id
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

document.querySelector("#orderId").innerHTML = id;
