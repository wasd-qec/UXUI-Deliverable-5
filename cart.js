let cart = JSON.parse(localStorage.getItem('cart')) || [];
renderCart();

function renderCart() {
    const cartContainer = document.getElementById('cart-items');
    const emptyCart = document.getElementById('empty-cart');
    const addMoreLink = document.getElementById('add-more-link');
    
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        emptyCart.style.display = 'block';
        addMoreLink.style.display = 'none';
    } else {
        emptyCart.style.display = 'none';
        addMoreLink.style.display = 'flex';

        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="item-details">
                    <div class="item-name">${item.name}</div>
                    <div class="item-price-row">
                        <span class="item-price">$ ${item.price.toFixed(2)}</span>
                        <div class="quantity-controls">
                            <button class="qty-btn" onclick="updateQuantity(${index}, -1)">−</button>
                            <span class="qty-value">${item.quantity}</span>
                            <button class="qty-btn" onclick="updateQuantity(${index}, 1)">+</button>
                        </div>
                    </div>
                </div>
            `;
            cartContainer.appendChild(cartItem);
        });
    }

    updateTotals();
}

function updateQuantity(index, change) {
    cart[index].quantity += change;
    
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function updateTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('subtotal').textContent = subtotal.toFixed(2) + ' $';
    document.getElementById('total').textContent = subtotal.toFixed(2) + ' $';
}
