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