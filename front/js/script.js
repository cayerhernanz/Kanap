// Recuperation et insertion du catalogue dans la page d'index
const indexCatalogReturn = async() => {

    //Recuperation du catalogue depuis l'API
        await fetch('http://localhost:3000/api/products')
            .then((res)=>res.json())
            
    //Ajout des produits dans le DOM et affichage des produits avec son lien
            .then( (APIresults) => {
                console.log('APIresults', APIresults);
                catalogDisplay(APIresults);
            })
            .catch((err)=> console.log(err));
}

function catalogDisplay (products){
    for (let product in products) {
    //Création de l'élément lien
    let itemLink = document.createElement("a");
    document.querySelector(".items").appendChild(itemLink);
    
    //Création des articles item
        let productCard = document.createElement("article");
        itemLink.appendChild(productCard);

    //Ajout de l'image avec osn texte alternatif
        let productCardImage = document.createElement("img");
        productCard.appendChild(productCardImage);
        productCardImage.src = products[product].imageUrl;
        productCardImage.alt = products[product].altTxt; 

    //Ajout du nom du produit
        let productCardTitle = document.createElement("h3");
        productCard.appendChild(productCardTitle);
        productCardTitle.classList.add("productName");
        productCardTitle.innerHTML = products[product].name;

    //Ajout de la description
        let productCardDescription = document.createElement("p");
        productCard.appendChild(productCardDescription);
        productCardDescription.classList.add("productDescription");
        productCardDescription.innerHTML = products[product].description;
    }
}

indexCatalogReturn();

 function catalogLinking (){{
    //Création du lien
        let url = new URL()
        let params = new URLSearchParams(url.search);
        params.append(products[product]._id);
        console.log(params.getAll('_id'))
        itemLink.href = url;
    }

 }

 
