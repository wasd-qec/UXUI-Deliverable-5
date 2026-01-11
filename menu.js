// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartCount();

// Add click event to all add buttons
document.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const menuItem = this.closest('.menu-item');
        const name = menuItem.querySelector('.item-name').textContent;
        const priceText = menuItem.querySelector('.item-price').textContent;
        const price = parseFloat(priceText.replace('$', '').trim());
        const image = menuItem.querySelector('img').getAttribute('src');

        // Check if item already in cart
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, image, quantity: 1 });
        }

        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();

        // Visual feedback
        this.textContent = '✓';
        setTimeout(() => { this.textContent = '+'; }, 500);
    });
});

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = totalItems;
}
