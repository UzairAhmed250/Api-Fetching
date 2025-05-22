
const loaderElement = document.getElementById("loader");

const container = document.getElementById('card-container');

async function fetchData(){
    loaderElement.style.display = "flex";
    loaderElement.style.display = "justifyContent: center; ";
    loaderElement.style.display = "alignItems: center; ";
    try{
        const res = await fetch('https://dummyjson.com/products')
        const jsonData = await res.json()
        const products = jsonData.products
        products.forEach(product => {
            const card = document.createElement("div");
            card.className = "card";
            card.style.width = "18rem";

            card.innerHTML = `
        <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}" />     
        <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">${product.description}</p>
            <p class="card-price"><strong>US$: </strong>${product.price}</p>
            <a href="#" class="btn btn-primary">Buy now</a>
            
        </div>
            `;
            container.appendChild(card)
        })
        
        console.log(jsonData);
    }catch(error){
        console.error("Error Fetching Detail: ", error)
    } finally{
       loaderElement.style.display = "none";
    }
}

fetchData()

