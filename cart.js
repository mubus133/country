function renderCart() {
    // Retrieve cart data from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = ''; 

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {

        cart.forEach((product, index) => {
            const productCard = document.createElement('div');
            productCard.classList.add('col-md-4', 'mb-4');
            productCard.innerHTML = `
                <div class="card">
                    <img src="${product.image}" class="card-img-top" alt="${product.title}">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">$${product.price*2}</p>
                        <button class="btn btn-danger" onclick="removeFromCart(${index})">Remove</button>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(productCard);
        });
    }
}

// Function to remove product from cart
function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart.splice(index, 1);

    localStorage.setItem('cart', JSON.stringify(cart));

    
    renderCart();
}


renderCart();


document.getElementById('checkoutBtn').addEventListener('click', function() {
    window.location.href = 'checkout.html'; 
});
