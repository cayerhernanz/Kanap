let params = new URL(document.location).searchParams;
let id = params.get("id");
console.log(id);

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
    productImage.src = product.imageUrl;
     productImage.alt= product.altTxt;
    document.querySelector(".item__image").appendChild(productImage);

    //Ajout nom produit
    let productName = document.querySelector("#title");
    productName.innerHTML = product.name;

    //Ajout du prix
    let productPrice = document.querySelector("#price");
    productPrice.innerHTML = product.price;
        /* //Formatage prix
        Intl.NumberFormat('fr-FR', {style: 'currency', currency: 'EUR'}).format(productPrice);
        //Soit recuperer la donnée et la diviser par 100
        let productPriceData = product.price;
        let productPriceForm = productPriceData/100;
        productPrice.innerHTML = productPriceForm  */

    //Ajout description
    let productDescription = document.querySelector("#description");
    productDescription.innerHTML = product.description;

    //Ajout des options couleur
     for (let color in colors){
        let productColor = document.querySelector("option");
        let productColorOption = document.createElement("option");
        productColor.appendChild(productColorOption);
        productColorOption.value = product.color[colors];
        productColorOption.innerHTML = product.color[colors];
    }
}


productReturn();