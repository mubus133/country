const cartItemsContainer = document.getElementById('cartItems');
const proceedToCheckoutBtn = document.getElementById('checkoutBtn');

let cart = JSON.parse(localStorage.getItem('cart')) || [];


function displayCartItems() {
    cartItemsContainer.innerHTML = ''; 

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cart.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('cart-item');
        productDiv.innerHTML = `
            <p>${product.title}</p>
            <p>$${product.price}</p>
            <p>Quantity: 1</p> <!-- Assuming 1 for simplicity -->
        `;
        cartItemsContainer.appendChild(productDiv);
    });
}

displayCartItems();


checkoutBtn.addEventListener('click', function() {

    localStorage.setItem('cart', JSON.stringify(cart));

    
    window.location.href = 'checkout.html';  
});
