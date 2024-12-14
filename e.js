const productGrid = document.getElementById('productGrid');
const cartIcon = document.getElementById('cartIcon');
const cartCount = document.getElementById('cartCount');
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const cart = []; 
let allProducts = [];

// Cart Modal Elements
const cartModal = document.createElement('div');
cartModal.classList.add('cart-modal');
cartModal.style.display = 'none';
cartModal.innerHTML = `
    <div class="cart-modal-content">
        <h2>Your Cart</h2>
        <div id="cartItems"></div>
        <button id="checkoutBtn">Proceed to Checkout</button>
        <button id="closeCartBtn">Close</button>
    </div>
`;

document.body.appendChild(cartModal);

// Fetch products from the API
function fetchProducts(query = '') {
    let url = 'https://fakestoreapi.com/products';
    searchInput.value = ''
    if (query) {
        url += `?search=${searchInput.value}`;
        
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            allProducts = data;
            displayProducts(data);
        })
        .catch(error => console.error('Error fetching products:', error));
}

// Display products in grid
function displayProducts(products) {
    productGrid.innerHTML = ''; 
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h5>${product.title}</h5>
            <p>$${product.price}</p>
            <button data-id="${product.id}" class="add-to-cart-btn">Add to Cart</button>
        `;
        productCard.querySelector('.add-to-cart-btn').addEventListener('click', () => addToCart(product));
        productCard.addEventListener('click', () => showProductDetails(product));
        productGrid.appendChild(productCard);
    });
}

// Add product to cart
function addToCart(product) {
    cart.push(product);
    updateCartCount();
}



function updateCartCount() {
    cartCount.textContent = cart.length;
}


// Show cart modal
cartIcon.addEventListener('click', () => {
    updateCartModal();
    cartModal.style.display = 'block';
});

// Close cart modal
document.getElementById('closeCartBtn').addEventListener('click', () => {
    cartModal.style.display = 'none';
});

// Update cart modal content
function updateCartModal() {
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = '';
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach(product => {
            const item = document.createElement('div');
            item.classList.add('cart-item');
            item.innerHTML = `
                <p>${product.title} - $${product.price*2}</p>
            `;
            cartItemsContainer.appendChild(item);
        });
    }
}

// Show product in a modal
function showProductDetails(product) {
    //modal elements
    const modal = new bootstrap.Modal(document.getElementById('productModal')); 
    const productImage = document.getElementById('productImage');
    const productTitle = document.getElementById('productTitle');
    const productDescription = document.getElementById('productDescription');
    const productPrice = document.getElementById('productPrice');
    const addToCartBtn = document.getElementById('addToCartBtn');
    
    productImage.src = product.image;
    productTitle.textContent = product.title;
    productDescription.textContent = product.description;
    productPrice.textContent = `$${product.price*2}`;

    addToCartBtn.addEventListener('click', () => {
        addToCart(product); 
        modal.hide();
    });

    modal.show();
}

searchForm.addEventListener('submit', event => {
    event.preventDefault();
    const query = searchInput.value.trim();
    fetchProducts(query);
});


fetchProducts();


function addToCart(product) {

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    
    cart.push(product);

    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartCount.textContent = cart.length;
}


cartIcon.addEventListener('click', () => {
    window.location.href = 'cart.html'; 
});

