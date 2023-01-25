//Variables
let cartContent = JSON.parse(localStorage.getItem("cart-products"));
console.log(cartContent);
let arrayProdId = [];
let totalQuantity = 0;
let totalPrice = 0;

//Affichage des produits du pannier à partir du LS
function cartProductDisplay(){
    let cart = document.querySelector("#cart__items");
    //Verification que le panier est vide
    if(cartContent === null){
        //Création d'un message de panier vide
        console.log("Panier vide");
    }
    else{
        //Boucle pour tous les éléments du panier
        for (let object of cartContent){

            let id = object.id;
            arrayProdId.push(id);

            //Article
            let cartItem = document.createElement("article");
            cart.appendChild(cartItem);
            cartItem.classList.add("cart__item");
            cartItem.dataset.id = id;
            cartItem.dataset.color = object.color;

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
            cartItCntDesProdColor.innerHTML = object.color;
            
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
            cartItCntSetQuantValue.value = object.quantity;
            //Listener modifier quantiité
            cartItCntSetQuantValue.addEventListener("change", function(e){
                quantityModification(e);
            });

            //Contenu-Settings-Supprimer
            let cartItCntSetDelete = document.createElement("div");
            cartItemContentSettings.appendChild(cartItCntSetDelete);
            cartItCntSetDelete.classList.add("cart__item__content__settings__delete")

            let cartItCntSetDeleteText = document.createElement("p");
            cartItCntSetDeleteText.classList.add("deleteItem");
            cartItCntSetDelete.appendChild(cartItCntSetDeleteText);
            cartItCntSetDeleteText.innerHTML = "Supprimer";
            //Listener supprimer (appel function event, puis à l'interieur appel a la fonction de supression)
            cartItCntSetDeleteText.addEventListener("click", function(e){
                itemDelete(e);
            });

            //Appel à l'API pour récupérer les données nécéssaires
            fetch(`http://localhost:3000/api/products/${id}`)
            .then((res)=>res.json())
            .then((APIresults) => {

                //Ajout des contenus à partir de l'API
                cartItemImageFile.src = APIresults.imageUrl;
                cartItemImageFile.alt = APIresults.altTxt;
                cartItCntDesProdname.innerHTML = APIresults.name;
                cartItCntDesProdPrice.innerHTML = Intl.NumberFormat('fr-FR', {style: 'currency', currency:'EUR'}).format(APIresults.price);

                //Calcul du prix en fonction de la quantité par produit
                totalPrice = totalPrice + object.quantity * APIresults.price;
                displayCartPrice();
            })

        totalQuantity = totalQuantity + object.quantity;
        }
        displayCartQuantity();
    }
}
cartProductDisplay(cartContent);

//Calcul du prix total du pannier et de la quantité totale
function displayCartPrice(){
    document.querySelector("#totalPrice").innerHTML = totalPrice;
}

function displayCartQuantity(){
    document.querySelector("#totalQuantity").innerHTML = totalQuantity;
}

//Modification de la quantité 
function quantityModification(event){
    event.preventDefault();
    //Verifier que la quantité est positive
    if (parseFloat(event.target.value) >= 1){  
        //Récupérer l'article modifié, son id et sa couleur
        let currentItem = event.target.closest('article');
        let selectedItemColor = currentItem.dataset.color;
        let selectedItemId = currentItem.dataset.id;
        
        //Selectionner l'index de l'article avec cet id et la couleur dans le tableau LS avec le panier
        let selectedProd = cartContent.find(object => object.id === selectedItemId && object.color === selectedItemColor);
        let selectedProdIndex = cartContent.indexOf(selectedProd);

        //Récupérer la nouvelle quantité
        let itemNewQuantity = parseFloat(event.target.value);
        
        //Modifier la quantité de l'article dans ce tableau
        cartContent[selectedProdIndex].quantity = itemNewQuantity;

        //Modification du LS
        localStorage.setItem("cart-products", JSON.stringify(cartContent));

        //recharger la page
        window.location.href = "cart.html";
    }
    else{
        window.alert("Quantités négatives non acceptées!");
    }
}


//Suppression des éléments du pannier
function itemDelete(event){
    event.preventDefault();
    let result = confirm("Éliminer le produit du panier?");
    if (result){
            //recuperer l'id et la couleur de l'article
            let selectItem = event.target.closest('article');
            let selectedItemId = selectItem.dataset.id;
            let selectedItemColor = selectItem.dataset.color;

            //Selectionner l'index de l'article avec cet id et la couleur dans le tableau
            let selectedProd = cartContent.find(object => object.id === selectedItemId && object.color === selectedItemColor);
            let selectedProdIndex = cartContent.indexOf(selectedProd);
            cartContent.splice(selectedProdIndex, 1);

            //Modification du LS
            localStorage.setItem("cart-products", JSON.stringify(cartContent));

            //recharger la page
            window.location.href = "cart.html";
    }
}



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
console.log(orderBtn);
orderBtn.addEventListener("click", function(event){
    event.preventDefault();
    //Verification que le panier est vide
    if((cartContent) === null || cartContent.length === 0){
        window.alert("Erreur. Le panier est vide.")
    }
    else{
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
    }
})