let params = new URL(document.location).searchParams;
let orderId = params.get("orderId");

//Affichage du numero de commande
let idDisplay = document.querySelector("#orderId");
idDisplay.innerHTML = orderId;