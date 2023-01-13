//Variables
let cartContent = JSON.parse(localStorage.getItem("cart-products"));
console.log(cartContent);
let arrayProdId = [];

//Affichage des produits du pannier à partir du LS
function cartProductDisplay(){
    let cart = document.querySelector("#cart__items");
    let arrayCrtPrices = [];
    let arrayCrtQuant = [];

    //Boucle pour tous les éléments du panier
    for (let object in cartContent){

        let id = cartContent[object].id;
        arrayProdId.push(id);

        //Article
        let cartItem = document.createElement("article");
        cart.appendChild(cartItem);
        cartItem.classList.add("cart__item");
        cartItem.dataset.id = id;
        cartItem.dataset.color = cartContent[object].color;

        //Image
        let cartItemImage = document.createElement("div");
        cartItem.appendChild(cartItemImage);
        cartItemImage.classList.add("cart__item__img");
        let cartItemImageFile = document.createElement("img");
        cartItemImage.appendChild(cartItemImageFile);

        //Contenu
        let cartItemContent = document.createElement("div");
        cartItemContent.classList.add("cart__item__content");
        cartItem.appendChild(cartItemContent);
        
        //Contenu-description
        let cartItemContentDescription = document.createElement("div");
        cartItemContent.appendChild(cartItemContentDescription);
        cartItemContentDescription.classList.add("cart__item__content__description");

        //Contenu-description-éléments
        let cartItCntDesProdname = document.createElement("p");
        cartItemContentDescription.appendChild(cartItCntDesProdname);
        
        let cartItCntDesProdColor = document.createElement("p");
        cartItemContentDescription.appendChild(cartItCntDesProdColor);
        cartItCntDesProdColor.innerHTML = cartContent[object].color;
        
        let cartItCntDesProdPrice = document.createElement("p");
        cartItCntDesProdPrice.classList.add("item__price");
        cartItemContentDescription.appendChild(cartItCntDesProdPrice);

        //Contenu-Settings
        let cartItemContentSettings = document.createElement("div");
        cartItemContent.appendChild(cartItemContentSettings);
        cartItemContentSettings.classList.add("cart__item__content__settings")

        //Contenu-Settings-Quantité
        let cartItCntSetQuantity = document.createElement("div");
        cartItemContentSettings.appendChild(cartItCntSetQuantity);

        let cartItCntSetQuantText = document.createElement("p");
        cartItCntSetQuantity.appendChild(cartItCntSetQuantText);
        cartItCntSetQuantText.innerHTML = "Qté: ";

        let cartItCntSetQuantValue = document.createElement("input");
        cartItCntSetQuantity.appendChild(cartItCntSetQuantValue);
        cartItCntSetQuantValue.type = "number";
        cartItCntSetQuantValue.classList.add("itemQuantity");
        cartItCntSetQuantValue.name = "itemQuantity";
        cartItCntSetQuantValue.min = 1;
        cartItCntSetQuantValue.max = 100;
        cartItCntSetQuantValue.value = cartContent[object].quantity;

        //Contenu-Settings-Supprimer
        let cartItCntSetDelete = document.createElement("div");
        cartItemContentSettings.appendChild(cartItCntSetDelete);
        cartItCntSetDelete.classList.add("cart__item__content__settings__delete")

        let cartItCntSetDeleteText = document.createElement("p");
        cartItCntSetDeleteText.classList.add("deleteItem");
        cartItCntSetDelete.appendChild(cartItCntSetDeleteText);
        cartItCntSetDeleteText.innerHTML = "Supprimer";

        //Appel à l'API pour récupérer les données nécéssaires
        fetch(`http://localhost:3000/api/products/${id}`)
            .then((res)=>res.json())
            .then((APIresults) => {

            //Ajout des contenus à partir de l'API
            cartItemImageFile.src = APIresults.imageUrl;
            cartItemImageFile.alt = APIresults.altTxt;
            cartItCntDesProdname.innerHTML = APIresults.name;
            let cartItPricenoformat = APIresults.price;
            cartItCntDesProdPrice.innerHTML = Intl.NumberFormat('fr-FR', {style: 'currency', currency:'EUR'}).format(cartItPricenoformat);

            //Ajout du prix du produit au LS pour le calcul du total
            let itemPrice = parseFloat(cartItPricenoformat);
            console.log(itemPrice);
            localStorage.setItem("item-price", JSON.stringify(itemPrice));
            })   
            
        //Création d'un tableau de quantités dans le LS pour le calcul du total
        let itemTotalQuantity = cartContent[object].quantity;
        arrayCrtQuant.push(itemTotalQuantity);
        localStorage.setItem("cart-quantities", JSON.stringify(arrayCrtQuant));

        //Modification de la quantité 
        let quantitySelector = document.querySelector(".itemQuantity");
        quantitySelector.addEventListener("click", function(){
            let changeAlert = confirm("Modifier la quantité de ce produit?");
                if (changeAlert){
                    //Récupérer la nouvelle quantité
                    let itemNewQuantity = document.querySelector(".itemQuantity");
                    //Affichage de la nouvelle quantité
                    cartItCntSetQuantValue.value = itemNewQuantity;
                }
        })

        //Calcul du prix en fonction de la quantité par produit
        let itemPriceRecupered = document.querySelector(".item__price").textContent;
        console.log(itemPriceRecupered);
        let itemTotalQuantityCalc = parseFloat(quantitySelector.value);
        let itemPrice = JSON.parse(localStorage.getItem("item-price"));
        let itemPriceCalc = parseFloat(itemPrice);
        let itemTotalPrice = itemTotalQuantityCalc * itemPriceCalc;
        arrayCrtPrices.push(itemTotalPrice);
        console.log(itemTotalQuantityCalc);
        console.log(arrayCrtPrices);
        localStorage.setItem("cart-prices", JSON.stringify(arrayCrtPrices));
    }
}
cartProductDisplay(cartContent);

//Calcul du prix total du pannier et de la quantité totale
//Création des variables et d'un tableau contenant les prix
let cartQuantity = document.querySelector("#totalQuantity");
let cartTotalPrice = document.querySelector("#totalPrice");
let arrayCrtPrices = [];
let arrayCrtQuant = [];

function displayCartPrice(){
    arrayCrtPrices = JSON.parse(localStorage.getItem("cart-prices"));
    let crtTotalPrice = arrayCrtPrices.reduce((accumulator, currentValue) => accumulator + currentValue);
    let cartPrice = parseFloat(crtTotalPrice);
    cartTotalPrice.innerHTML = cartPrice;
}

function displayCartQuantity(){
    arrayCrtQuant = JSON.parse(localStorage.getItem("cart-quantities"));
    let crtTotalQuant = arrayCrtQuant.reduce((accumulator, currentValue) => accumulator + currentValue);
    let crtQuantValue = parseFloat(crtTotalQuant);
    cartQuantity.innerHTML = crtQuantValue;
}

displayCartPrice();
displayCartQuantity();

//Suppression des éléments du pannier
let deleteItemBtnList = document.querySelectorAll(".deleteItem");
console.log(deleteItemBtnList);
function itemDelete(){
    for (let deleteBtn of deleteItemBtnList){
        deleteBtn.addEventListener("click", function(){
        event.preventDefault();
        let result = confirm("Éliminer le produit du panier?");
            if (result){
            //recuperer l'id et la couleur de l'article
                let currentItem = event.currentTarget;
                let currentItemParent = currentItem.parentNode;
                let selectItemCont = currentItemParent.parentNode;
                let selectItemContParent = selectItemCont.parentNode;
                let selectItem = selectItemContParent.parentNode;
                let selectedItemId = selectItem.getAttribute("data-id");
                let selectedItemColor = selectItem.getAttribute("data-color");
                console.log(selectedItemColor);
                console.log(selectedItemId);

                //Selectionner lindex de l'article avec cet id et la couleur dans le tableau
                let selectedProd = cartContent.find(object => object.id === selectedItemId && object.color === selectedItemColor);
                console.log(selectedProd);
                let selectedProdIndex = cartContent.indexOf(selectedProd);
                console.log(selectedProdIndex);
                cartContent.splice(selectedProdIndex, 1);
                console.log(cartContent);

                //Vidage du LS pour la quantité et le prix (pour recalcul)
                localStorage.removeItem("cart-prices");
                localStorage.removeItem("cart-quantities");

                //Modification du LS
                localStorage.setItem("cart-products", JSON.stringify(cartContent));

                //recharger la page
                window.location.href = "cart.html";
                cartProductDisplay(cartContent);
                displayCartPrice();
                displayCartQuantity();
            }
        }
    )}
}
itemDelete();

//Validation du formulaire
//Création des différnetes RegExp pour la validation
//Nom, prénom, ville
let rxpNamesAndCity = new RegExp(/^[a-z ,.'-]+$/i);

//Addresse
let rxpAddress = new RegExp(/^[a-zA-Z0-9\s,'-]*$/);

//email
let rxpEmail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

//Commander
let orderBtn = document.querySelector("#order");
orderBtn.addEventListener("click", function(){
    event.preventDefault();
    //création des variables pour les fonctions
    let formName = document.getElementById("firstName").value;
    let formLastName = document.getElementById("lastName").value;
    let formAddress = document.getElementById("address").value;
    let formCity = document.getElementById("city").value;
    let formEmail = document.getElementById("email").value;
    let nameError = document.querySelector("#firstNameErrorMsg");
    let lastNameError = document.querySelector("#lastNameErrorMsg");
    let addressError = document.querySelector("#addressErrorMsg");
    let cityError = document.querySelector("#cityErrorMsg");
    let emailError = document.querySelector("#emailErrorMsg");
    let nameValidated;
    let lastNameValidated;
    let addressValidated;
    let cityValidated;
    let emailValidated;
    let formValidated;
 
    //Validation par élément
    let nameTest = rxpNamesAndCity.test(formName);
    if(nameTest === true){
        nameValidated = true;
    }
    else{
        nameValidated = false;
        nameError.innerHTML = "Ceci est un message d'erreur.";
    }
    console.log(nameValidated);
    let lastNameTest = rxpNamesAndCity.test(formLastName);
    if(lastNameTest === true){
        lastNameValidated = true;
    }
    else{
        lastNameValidated = false;
        lastNameError.innerHTML = "Ceci est un message d'erreur.";
    }
    console.log(lastNameValidated);
    let addressTest = rxpAddress.test(formName);
    if(addressTest === true){
        addressValidated = true;
    }
    else{
        addressValidated = false;
        addressError.innerHTML = "Ceci est un message d'erreur.";
    }
    console.log(addressValidated);
    let cityTest = rxpNamesAndCity.test(formCity);
    if(cityTest === true){
        cityValidated = true;
    }
    else{
        cityValidated = false;
        cityError.innerHTML = "Ceci est un message d'erreur.";
    }
    console.log(cityValidated);
    let emailTest = rxpEmail.test(formEmail);
    if(emailTest === true){
        emailValidated = true;
    }
    else{
        emailValidated = false;
        emailError.innerHTML = "Ceci est un message d'erreur.";
    }
    console.log(emailValidated);
    if(nameValidated === true && lastNameValidated === true && addressValidated === true && cityValidated === true && emailValidated === true){
        formValidated = true;
    }
    else{
        formValidated = false;
    }
    
    if(formValidated === true){
        //Création de l'objet de contact et le tableau d'ids
        let order = {
            contact : {
                firstName: formName,
                lastName: formLastName,
                address: formAddress,
                city: formCity,
                email: formEmail,
            },
            products : arrayProdId,
        }
        console.log(order);

        //Requete POST
        fetch('http://localhost:3000/api/products/order', {
        method: 'POST',
        body: JSON.stringify(order),
        headers: { "Content-Type": "application/json" },
        })
        .then((res) => res.json())
        .then((order) => {
            console.log('order', order);
            let orderNum = order.orderId;
            console.log(orderNum);

            //Création de la page confirmation spécifique à la commande
            window.location.href=`confirmation.html?order=${orderNum}`;
            localStorage.clear();
        })
        .catch((err) => console.log(err));
    }
    else{
        window.alert("Une erreur est survenue, veuillez vérifer le formulaire.");
    }
})