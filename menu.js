let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
updateCartCount();
renderSidebarCart();

document.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const menuItem = this.closest('.menu-item');
        const name = menuItem.querySelector('.item-name').textContent;
        const priceText = menuItem.querySelector('.item-price').textContent;
        const price = parseFloat(priceText.replace('$', '').trim());
        const image = menuItem.querySelector('img').getAttribute('src');

        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, image, quantity: 1 });
        }

        sessionStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        renderSidebarCart();

        this.textContent = '✓';
        setTimeout(() => { this.textContent = '+'; }, 500);
    });
});

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = totalItems;
}

function renderSidebarCart() {
    const container = document.getElementById('sidebar-cart-items');
    if (!container) return;
    container.innerHTML = '';
    if (!cart || cart.length === 0) {
        container.innerHTML = '<p>Your cart is empty</p>';
        return;
    }
    cart.forEach(item => {
        const el = document.createElement('div');
        el.className = 'cart-item';
        el.innerHTML = `\n            <div class="item-image" style="width:56px;height:56px;border-radius:6px;overflow:hidden;flex-shrink:0;"><img src="${item.image}" style="width:100%;height:100%;object-fit:cover;"/></div>\n            <div class="item-details">\n                <div style="font-weight:600;color:var(--primary-color);">${item.name}</div>\n                <div style="color:var(--primary-color);">${item.quantity} × ${item.price.toFixed(2)} $</div>\n            </div>\n        `;
        container.appendChild(el);
    });
}

const categoriesEl = document.querySelector('.categories');
const catLeft = document.querySelector('.cat-arrow.left');
const catRight = document.querySelector('.cat-arrow.right');
if (catLeft && catRight && categoriesEl) {
    const scrollAmount = 160;
    catLeft.addEventListener('click', () => { categoriesEl.scrollBy({ left: -scrollAmount, behavior: 'smooth' }); });
    catRight.addEventListener('click', () => { categoriesEl.scrollBy({ left: scrollAmount, behavior: 'smooth' }); });

    document.addEventListener('keydown', (e) => {
        if (window.innerWidth < 1024) return;
        if (e.key === 'ArrowLeft') { categoriesEl.scrollBy({ left: -scrollAmount, behavior: 'smooth' }); }
        if (e.key === 'ArrowRight') { categoriesEl.scrollBy({ left: scrollAmount, behavior: 'smooth' }); }
    });
}
