const loaderElement = document.getElementById("loader");

const container = document.getElementById("card-container");
const details = document.getElementById("details");

function displayHash() {
  var theHash = window.location.hash;
  if (theHash.length == 0) {
    theHash = "_index";
  }
  var elems = document.querySelectorAll("#caption");
  elems.innerText = "Current Hash: " + theHash;
  return true;
}

displayHash();

async function fetchData() {
  loaderElement.style.display = "flex";
  loaderElement.style.display = "justifyContent: center; ";
  loaderElement.style.display = "alignItems: center; ";
  try {
    const res = await fetch("https://dummyjson.com/products");
    const jsonData = await res.json();
    const products = jsonData.products;

    products.forEach((product) => {
      const userId = product.id;
      const card = document.createElement("div");
      card.className = "card";
      card.style.width = "18rem";
      card.innerHTML = `
      <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}" />     
      <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">${product.description}</p>
            <p class="card-price"><strong>US$: </strong>${product.price}</p>
            <a href="./pages/product.html?product=${userId}" class="btn btn-primary buy-now-btn">Buy now</a>
        </div>
            `;
      container.appendChild(card);
    });

    console.log(jsonData);
  } catch (error) {
    console.error("Error Fetching Detail: ", error);
  } finally {
    loaderElement.style.display = "none";
  }
}

fetchData();

// console.log("Selected Card ID:", cardId ? cardId : "");

// fetchPerCardData()
