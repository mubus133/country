// Function to render the cart
function renderCart() {
    // Retrieve cart data from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = ''; // Clear any previous content

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        // Loop through each cart item and create a card
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
    // Retrieve the current cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Remove the product at the specified index
    cart.splice(index, 1);

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Re-render the cart page
    renderCart();
}

// Initial call to render the cart when the page loads
renderCart();

// Trigger checkout action
document.getElementById('checkoutBtn').addEventListener('click', function() {
    window.location.href = 'checkout.html'; // Redirect to checkout page
});
