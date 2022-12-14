//Variables
let cartContent = JSON.parse(localStorage.getItem("cart-products"));
console.log(cartContent);

//Affichage des produits du pannier à partir du LS
function cartProductDisplay(){
    let cart = document.querySelector("#cart__items");

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
        cartItCntSetDeleteText.classList.add("deleteItem");
        cartItCntSetDeleteText.innerHTML = "Supprimer";

        /*//Appel à l'API pour récupérer les données nécéssaires
        const productReturn = async() => {
        await fetch('http://localhost:3000/api/products')
            .then((res)=>res.json())
            .then( (APIresults) => {
            console.log('APIresults', APIresults);
        })
            .catch((err)=> console.log(err));
        }

        //Ajout des contenus à partir de l'API
        productReturn();
        cartItemImageFile.src = APIresults.imageUrl;
        cartItemImageFile.alt = APIresults.altTxt;
        cartItCntDesProdname.innerHTML = APIresults.name;
        cartItCntDesProdPrice.innerHTML = APIresults.price;  */
    }
}

cartProductDisplay(cartContent);

