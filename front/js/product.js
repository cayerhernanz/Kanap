let params = new URL(document.location).searchParams;
let id = params.get("id");

const productReturn = async() => {
        await fetch(`http://localhost:3000/api/products/${id}`)
            .then((res)=>res.json())
            .then( (APIresults) => {
                console.log('APIresults', APIresults);
                productDisplay(APIresults);
            })
            .catch((err)=> console.log(err));
}

//Affichage produit
function productDisplay(product){
    //Ajout image
    let productImage = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImage);
    productImage.src = product.imageUrl;
    productImage.alt= product.altTxt;
    
    //Ajout nom produit
    let productName = document.querySelector("#title");
    productName.innerHTML = product.name;

    //Ajout du prix
    let productPrice = document.querySelector("#price");
    productPrice.innerHTML = product.price;
        //Formatage prix
        let productPriceData = product.price;
        productPrice.innerHTML = productPriceData;

    //Ajout description
    let productDescription = document.querySelector("#description");
    productDescription.innerHTML = product.description;

    //Ajout des options couleur
    let productColor = document.querySelector("#colors");
    for (let color of product.colors){
        let productColorOption = document.createElement("option");
        productColor.appendChild(productColorOption);
        productColorOption.value = color;
        productColorOption.innerHTML = color;
    }
}

productReturn();

//Création de variables pour les choix
let productColor = document.querySelector("#colors");
let productQuantity = document.querySelector("#quantity");
let addBtn = document.querySelector("#addToCart");

//Envoi du panier
addBtn.addEventListener("click", (event) =>{
    event.preventDefault();

    //Création des constantes pour les valeurs du produit
    let colorValue = productColor.value;
    let quantitySelected = Number(productQuantity.value);

    //Conditions
    if (quantitySelected >= 1 && quantitySelected <= 100 && colorValue !== ""){

        //Recupération valeurs du produit
        let productSelected = {
            id: id,
            color: colorValue,
            quantity: quantitySelected,
        };

        //Création du tableau des valeurs
        let arrayCart = [];
    
        //Vérfication que le LocalStorage n'existe pas
        if (localStorage.getItem("cart-products") == null) {

            //Création du LS et insertion du tableau
            localStorage.setItem("cart-products", JSON.stringify(arrayCart));
            arrayCart.push(productSelected);
        }

        //Sinon, récupération du tableau dans le LS
        else{
            arrayCart = JSON.parse(localStorage.getItem("cart-products"));
            
            //Vérification que le même produit existe dans le tableau(id et couleur)
            let prodSelectId = productSelected.id;
            let prodSelectColor = productSelected.color;
            let prodSelectQuantity = productSelected.quantity;
            console.log(prodSelectQuantity);
            if (arrayCart.find(object => object.id === prodSelectId && object.color === prodSelectColor)) {
                window.alert("encontrado");
                let equalProduct = arrayCart.find(object => object.id === prodSelectId && object.color === prodSelectColor);
                let productCurrentQuantity = equalProduct.quantity;
                let productNewQuantity = productCurrentQuantity + prodSelectQuantity;
                equalProduct.quantity = productNewQuantity;
                console.log(productNewQuantity);
            }
            
            //Si non, insertion de l'élément
            else{
                arrayCart.push(productSelected);
            }
        localStorage.setItem("cart-products", JSON.stringify(arrayCart));
        }

        //Rédirection à la page panier
        window.location.href = "cart.html";
    }

        //En cas de manque de donnée
    else {
        window.alert("Veuillez vérifier qu'une couleur est choisie et que la quantité est au moins d'un produit.")
    }
})

