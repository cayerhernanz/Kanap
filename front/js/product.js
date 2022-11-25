let params = new URL(document.location).searchParams;
let id = params.get("_id");

//Récupération du produit
const productReturn = async() => {

    //Recuperation du produit dans le catalogue
        await fetch(`http://localhost:3000/api/products/${"_id"}`)
            .then((res)=>res.json())
            
    //Ajout dans le DOM de la page produit
            .then( (APIresults) => {
                console.log('APIresults', APIresults);
                // productDisplay(APIresults);
            })
            .catch((err)=> console.log(err));
}

/* //Affichage produit
function productDisplay(products){
    //Ajout image
    let productImage = document.createElement("img");
    productImage.src = products[product].imageUrl;
     productImage.alt= product[products].altTxt;
    document.querySelector(".item__image").appendChild(productImage);

    //Ajout nom produit
    let productName = document.querySelector("#title");
    productName.innerHTML = product[products].name;

    //Ajout du prix
    let productPrice = document.querySelector("#price");
    productPrice.innerHTML = product[products].price;
        //Formatage prix
        Intl.NumberFormat('fr-FR', {style: 'currency', currency: 'EUR'}).format(productPrice);
        //Soit recuperer la donnée et la diviser par 100
        let productPriceData = product[products].price;
        let productPriceForm = productPriceData/100;
        productPrice.innerHTML = productPriceForm 

    //Ajout description
    let productDescription = document.querySelector("#description");
    productDescription.innerHTML = product[products].description;

    //Ajout des options couleur
     for (let color in colors){
        let productColor = document.querySelector("option");
        let productColorOption = document.createElement("option");
        productColor.appendChild(productColorOption);
        productColorOption.value = product[products].color[color];
        productColorOption.innerHTML = product[products].color[colors];
    }
}
 */