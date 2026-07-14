const productsDiv = document.getElementById("products");
const searchInput = document.getElementById("search");

let allProducts = [];
let cart = [];
let favorites = [];

fetch("https://6a2cdbaf3e2b60ab039010cf.mockapi.io/api/v1/products")
.then(res => res.json())
.then(data => {
    console.log(data);
    allProducts = data;
    displayProducts(allProducts);
})

.catch(err => console.log(err));


// Display Products

function displayProducts(products){

    productsDiv.innerHTML = "";

    products.forEach(product => {

        const isFavorite =
        favorites.some(item => item.id === product.id);

        productsDiv.innerHTML += `

        <div class="card">

            <img src="${product.image}" alt="${product.title}">

            <h3>${product.title}</h3>

            <p><b>Brand:</b> ${product.brand}</p>

            <p><b>Category:</b> ${product.category}</p>

            <p><b>Price:</b> ₹${product.price}</p>

            <button
                class="cart-btn"
                onclick="addToCart('${product.id}')">
                Add To Cart
            </button>

            <button
                class="fav-btn"
                onclick="toggleFavorite('${product.id}')">

                ${isFavorite ? "❤️" : "🤍"}

            </button>

        </div>

        `;
    });
}


// Add To Cart

function addToCart(id){

    const product = allProducts.find(
        item => item.id === id
    );

    if(!product) return;

    cart.push(product);

    document.getElementById("cartCount").innerText =
    cart.length;
}


// Favorite

function toggleFavorite(id){

    const product = allProducts.find(
        item => item.id === id
    );

    if(!product) return;

    const index = favorites.findIndex(
        item => item.id === id
    );

    if(index === -1){

        favorites.push(product);

    }else{

        favorites.splice(index,1);
    }

    document.getElementById("favCount").innerText =
    favorites.length;

    displayProducts(allProducts);
}


// Show Favorites

function showFavorites(){

    if(favorites.length === 0){

        productsDiv.innerHTML = `
        <div class="empty">
            ❤️ No Favorite Products Yet
        </div>
        `;

        return;
    }

    displayProducts(favorites);
}


// Show Cart

function showCart(){

    if(cart.length === 0){

        productsDiv.innerHTML = `
        <div class="empty">
            🛒 Your Cart Is Empty
        </div>
        `;

        return;
    }

    displayProducts(cart);
}


// Home

function showHome(){

    displayProducts(allProducts);
}


// Search

searchInput.addEventListener("keyup", () => {

    const value =
    searchInput.value.toLowerCase();

    const filtered =
    allProducts.filter(product =>

        product.title.toLowerCase().includes(value)

        ||

        product.brand.toLowerCase().includes(value)

        ||

        product.category.toLowerCase().includes(value)

    );

    displayProducts(filtered);

});


// Navbar

document.getElementById("homeBtn")
.addEventListener("click",(e)=>{
    e.preventDefault();
    showHome();
});

document.getElementById("cartBtn")
.addEventListener("click",(e)=>{
    e.preventDefault();
    showCart();
});

document.getElementById("favBtn")
.addEventListener("click",(e)=>{
    e.preventDefault();
    showFavorites();
});