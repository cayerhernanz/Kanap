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
        let productPriceForm = productPriceData/100;
        productPrice.innerHTML = productPriceForm;

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
    let quantitySelected = productQuantity.value;

    //Recupération valeurs du produit
    let productSelected = {
        id: id,
        color: colorValue,
        quantity: quantitySelected,
    };
    console.log(productSelected);

    //Création du tableau des valeurs
    let arrayCart = [];
    
    //Conditions
    if (quantitySelected >= 1 && quantitySelected <= 100 && colorValue !== null){

    
        //Vérfication que le LocalStorage n'existe pas
        if (localStorage.getItem("cart-products") == null) {

            //Création du LS et insertion du tableau
            localStorage.setItem("cart-products", JSON.stringify(arrayCart));
            arrayCart.push(productSelected);
        }

        //Sinon, récupération du tableau dans le LS
        else{
            arrayCart = JSON.parse(localStorage.getItem("cart-products"));
        
            //Vérification que le même produit existe dans le tableau
            let prodSelectId = productSelected.id;
            let prodSelectVerif = arrayCart.includes();
            console.log(prodSelectVerif);
            if(prodSelectVerif == true){
                arrayCart.push(productSelected);
                console.log(productSelected.id);
              /*   //Si oui, récuperer de l'élément produit du tableau
                let arrayCartElement = arrayCart.indexOf(productSelected.id);

                //Comparer les couleurs
                if(productSelected.color == arrayCartElement.color){

                    //Si elles sont pareilles ajouter la quantité sélectionnée au tableau
                    let arrCtElQuantity = parseFloat(arrayCartElement.quantity);
                    let productSelectedQuantity = parseFloat(productSelected.quantity);
                    let arrCtElementNewQuantity = arrCtElQuantity + productSelectedQuantity;
                    arrayCart.splice(arrayCartElement, 3, arrCtElementNewQuantity);
                    console.log(arrCtElementNewQuantity);
                }

                //Si elles sont différentes insérer l'élément au tableau
                else{
                    arrayCart.push(productSelected);
                }
                console.log(arrayCartElement); */
            }

            //Si non, insertion de l'élément
            else{
                arrayCart.push(productSelected);
            }
            localStorage.setItem("cart-products", JSON.stringify(arrayCart));
        }
        console.log(arrayCart)

        //Rédirection à la page panier
        // window.location.href = "cart.html";
    }

        //En cas de manque de donnée
    else {
        window.alert("Veuillez vérifier qu'une couleur est choisie et que la quantité est au moins d'un produit.")
    }
})

