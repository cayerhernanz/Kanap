let params = new URL(document.location).searchParams;
let orderNum = params.get("order");
console.log(orderNum);

//Affichage du numero de commande
let idDisplay = document.querySelector("#orderId");
idDisplay.innerHTML = orderNum;