//Variables
let cartContent = JSON.parse(localStorage.getItem("cart-products"));
console.log(cartContent);

//Affichage des produits du pannier à partir du LS
function cartProductDisplay(){
    let cart = document.querySelector("#cart__items");
    let arrayCrtPrices = [];
    let arrayCrtQuant = [];

    //Boucle pour tous les éléments du panier
    for (let object in cartContent){

        let id = cartContent[object].id;

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
            cartItCntDesProdPrice.innerHTML = Intl.NumberFormat('fr-FR', {style: 'currency', currency:'EUR'}).format(APIresults.price/100);

            //Calcul du prix en fonctiond e la quantité par produit
            let itemTotalQuantity = parseFloat(cartItCntSetQuantValue.value);
            let itemPriceCalc = parseFloat(APIresults.price);
            let itemTotalPrice = itemPriceCalc * itemTotalQuantity;

            //Création d'un tableau de prix dans le LS pour le calcul du total
            arrayCrtPrices.push(itemTotalPrice);
            console.log(arrayCrtPrices);
            localStorage.setItem("cart-prices", JSON.stringify(arrayCrtPrices));
            })   

        //Création d'un tableau de quantités dabs le LS pour le calcul du total
        let itemTotalQuantity = parseFloat(cartContent[object].quantity);
        arrayCrtQuant.push(itemTotalQuantity);
        localStorage.setItem("cart-quantities", JSON.stringify(arrayCrtQuant));

        //Suppression des éléments du pannier
        cartItCntSetDeleteText.addEventListener("click", function(){
            event.preventDefault;
            let result = confirm("Éliminer le produit du panier?");
            if (result == true){
                //recuperer l'id et la couleur de l'article
                let currentItem = event.currentTarget;
                let currentItemParent = currentItem.parentNode;
                let selectItemCont = currentItemParent.parentNode;
                let selectItemContParent = selectItemCont.parentNode;
                let selectItem = selectItemContParent.parentNode;
                let selectedItemId = selectItem.getAttribute("data-id");
                let selectedItemColor = selectItem.getAttribute("data-color");

                //Selectionner l'article avec cet id et couleur dans le LS - eliminer - recharger
                // let selectedItem = cartContent.findIndex
            
            }
        })
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
    cartTotalPrice.innerHTML = cartPrice/100;
}

function displayCartQuantity(){
    arrayCrtQuant = JSON.parse(localStorage.getItem("cart-quantities"));
    let crtTotalQuant = arrayCrtQuant.reduce((accumulator, currentValue) => accumulator + currentValue);
    let crtQuantValue = parseFloat(crtTotalQuant);
    cartQuantity.innerHTML = crtQuantValue;
}

displayCartPrice();
displayCartQuantity();

//Validation du formulaire
