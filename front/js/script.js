indexCatalogReturn();
console.log(indexCatalogReturn);

// Recuperation et insertion du catalogue dans la page d'index
function indexCatalogReturn() {

    //Recuperation du catalogue depuis l'API
    function getCatalog(){
        fetch('http://localhost:3000/api/products')
            .then(function (res){
                if (res.ok) {
                    return res.json();
                }
            })

    //Ajout des produits dans le DOM
            .then(function (APIresults) {
                const products = APIresults;
                console.log(products);

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

            })
        }
}
