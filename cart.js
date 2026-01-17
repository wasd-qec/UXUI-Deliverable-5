let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
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
    
    sessionStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function updateTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const couponSelect = document.getElementById('coupon-select');
    const discountEl = document.getElementById('discount');
    const couponApplied = document.getElementById('coupon-applied');
    
    let discount = 0;
    const selectedCoupon = couponSelect ? couponSelect.value : '';
    
    if (selectedCoupon === '10off') {
        discount = subtotal * 0.10;
    } else if (selectedCoupon === '2off') {
        discount = Math.min(2, subtotal);
    } else if (selectedCoupon === 'free') {
        // Free drink - discount up to 3.95 (price of one drink)
        discount = Math.min(3.95, subtotal);
    }
    
    // Show/hide applied coupon indicator
    if (couponApplied) {
        couponApplied.style.display = selectedCoupon ? 'flex' : 'none';
    }
    
    const total = Math.max(0, subtotal - discount);
    
    document.getElementById('subtotal').textContent = subtotal.toFixed(2) + ' $';
    if (discountEl) discountEl.textContent = '-' + discount.toFixed(2) + ' $';
    document.getElementById('total').textContent = total.toFixed(2) + ' $';
}

// Coupon handling
const couponSelect = document.getElementById('coupon-select');
const removeCouponBtn = document.getElementById('remove-coupon');

if (couponSelect) {
    couponSelect.addEventListener('change', updateTotals);
}

if (removeCouponBtn) {
    removeCouponBtn.addEventListener('click', () => {
        couponSelect.value = '';
        updateTotals();
    });
}

// Delivery option toggle
const pickupOption = document.getElementById('pickup-option');
const deliveryOption = document.getElementById('delivery-option');
const roomInput = document.getElementById('room-input');

function updateDeliveryState() {
    if (pickupOption.checked) {
        roomInput.disabled = true;
        roomInput.value = '';
    } else {
        roomInput.disabled = false;
        if (!roomInput.value) roomInput.value = 'A-402';
    }
}

pickupOption.addEventListener('change', updateDeliveryState);
deliveryOption.addEventListener('change', updateDeliveryState);

// Initialize state
updateDeliveryState();
