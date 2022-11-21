
// Recuperation et insertion du catalogue dans la page d'index
const indexCatalogReturn = async() => {

    //Recuperation du catalogue depuis l'API
        await fetch('http://localhost:3000/api/products')
            .then((res)=>res.json())
            
    //Ajout des produits dans le DOM
            .then( (APIresults) => {
                console.log('APIresults', APIresults);
                catalogDisplay(APIresults);
            })
            .catch((err)=> console.log(err));
}

function catalogDisplay (products){
    //Création des articles item
                for (let product in products) {
                    let productCard = document.createElement("article");
                    document.querySelector(".items").appendChild(productCard);

        //Ajout de l'image avec osn texte alternatif
                    let productCardImage = document.createElement("img");
                    productCard.appendChild(productCardImage);
                    productCardImage.src = APIresults[product].imageUrl;
                    productCardImage.alt = APIresults[product].altTxt; 

        //Ajout du nom du produit
                    let productCardTitle = document.createElement("h3");
                    productCard.appendChild(productCardTitle);
                    productCardTitle.classList.add("productName");
                    productCardTitle.innerHTML = APIresults[product].name;

        //Ajout de la description
                    let productCardDescription = document.createElement("p");
                    productCard.appendChild(productCardDescription);
                    productCardDescription.classList.add("productDescription");
                    productCardDescription.innerHTML = APIresults[product].description;
                }
}

indexCatalogReturn();
console.log(products);

