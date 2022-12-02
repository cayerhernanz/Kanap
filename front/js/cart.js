//Variables
let cartContent = JSON.parse(localStorage.getItem("cart-products"));

//Appel à l'API pour récupérer les données nécéssaires
const productReturn = async() => {
    await fetch(`http://localhost:3000/api/products/${id}`)
        .then((res)=>res.json())
        .then( (APIresults) => {
            console.log('APIresults', APIresults);
        })
        .catch((err)=> console.log(err));
}

//Création de l'élément article du pannier et son contenu
function cartProductCreation(){
    let cart = document.querySelector("#cart__items");

    //Boucle pour tous les éléments du panier
    for (let product in cartContent){

        let id = cartContent[product].id;
        productReturn();

        //Article
        let cartItem = document.createElement("article");
        cart.appendChild(cartItem);
        cartItem.classList.add("cart__item");
        cartItem.dataset.id = id;
        cartItem.dataset.color = cartContent[product].color;

        //Image
        let cartItemImage = document.createElement("div");
        cartItem.appendChild(cartItemImage);
        cartItemImage.classList.add("cart__item__img");
        let cartItemImageFile = document.createElement("img");
        cartItemImageFile.src = APIresults.imageUrl;
        cartItemImageFile.alt = APIresults.altTxt;

        //Contenu
        let cartItemContent = doucment.createElement("div");
        cartItem.appendChild(cartItemContent);
        cartItemContent.classList.add("cart__item__content");

        //Contenu-description
        let cartItemContentDescription = document.createElement("div");
        cartItemContent.appendChild(cartItemContentDescription);
        cartItemContentDescription.classList.add("cart__item__content__description");

        //Contenu-description-éléments
        let cartItCntDesProdname = document.createElement("p");
        cartItemContentDescription.appendChild(cartItCntDesProdname);
        cartItCntDesProdname.innerHTML = APIresults.name;
        
        let cartItCntDesProdColor = document.createElement("p");
        cartItemContentDescription.appendChild(cartItCntDesProdColor);
        cartItCntDesProdColor.innerHTML = cartContent[product].color;
        
        let cartItCntDesProdPrice = document.createElement("p");
        cartItemContentDescription.appendChild(cartItCntDesProdPrice);
        cartItCntDesProdPrice.innerHTML = APIresults.price;

        //Contenu-Settings
        let cartItemContentSettings = document.createElement("div");
        cartItemContent.appendChild(cartItemContentSettings);
        cartItemContentSettings.classList.add("cart__item__content__settings")

        //Contenu-Settings-Quantité
        let cartItCntSetQuantity = document.createElement("div");
        cartItemContentSettings.appendChild(cartItCntSetQuantity);

        let cartItCntSetQuantText = document.createElement("p");
        cartItCntSetQuantity.appendChild(cartItCntSetQuantText);
        cartItCntSetQuantText.innerHTML = "Qté: "

        let cartItCntSetQuantValue = document.createElement("input");
        cartItCntSetQuantity.appendChild(cartItCntSetQuantValue);
        cartItCntSetQuantValue.type = number;
        cartItCntSetQuantValue.classList.add("itemQuantity");
        cartItCntSetQuantValue.name = itemQuantity;
        cartItCntSetQuantValue.min = 1;
        cartItCntSetQuantValue.max = 100;
        cartItCntSetQuantValue.value = cartContent[product].quantity;

        //Contenu-Settings-Supprimer
        let cartItCntSetDelete = document.createElement("div");
        cartItemContentSettings.appendChild(cartItCntSetDelete);
        artItCntSetDelete.classList.add("cart__item__content__settings__delete")

        let artItCntSetDeleteText = document.createElement("p");
        artItCntSetDelete.appendChild(artItCntSetDeleteText);
        artItCntSetDeleteText.classList.add("deleteItem");
        artItCntSetDeleteText.innerHTML = "Supprimer";

        console.log(product);

    }
}

cartProductCreation();


//Affichage des produits
function displayCart(){}
