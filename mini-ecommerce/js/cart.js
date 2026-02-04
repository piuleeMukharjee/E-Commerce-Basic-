/* =========================
   CART UTILITIES
========================= */

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

/* =========================
   ADD TO CART
========================= */

function addToCart(productId) {
    const cart = getCart();
    const product = products.find(p => p.id === productId);

    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
        showToast("Quantity updated");
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
        showToast("Added to cart");
    }

    saveCart(cart);
}

/* =========================
   CART ACTIONS
========================= */

function updateQuantity(id, change) {
    const cart = getCart();
    const item = cart.find(i => i.id === id);

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        removeItem(id);
        return;
    }

    saveCart(cart);
    renderCart();
}

function removeItem(id) {
    const cart = getCart().filter(i => i.id !== id);
    saveCart(cart);
    showToast("Item removed", "error");
    renderCart();
}

/* =========================
   RENDER CART
========================= */

function renderCart() {
    const cartItemsDiv = document.getElementById("cartItems");
    const totalDiv = document.getElementById("totalPrice");

    if (!cartItemsDiv || !totalDiv) return;

    const cart = getCart();
    cartItemsDiv.innerHTML = "";
    totalDiv.innerHTML = "";

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = `<p class="empty">Your cart is empty</p>`;
        return;
    }

    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const div = document.createElement("div");
        div.className = "cart-item";

        div.innerHTML = `
            <div>
                <strong>${item.name}</strong><br>
                ₹${item.price} × ${item.quantity}
            </div>

            <div class="cart-actions">
                <button onclick="updateQuantity(${item.id}, -1)">−</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, 1)">+</button>
                <button class="remove-btn" onclick="removeItem(${item.id})">Remove item</button>
            </div>
        `;

        cartItemsDiv.appendChild(div);
    });

    totalDiv.innerHTML = `
        <input id="couponInput" placeholder="Enter coupon code" />
        <button onclick="applyCoupon(${total})">Apply Coupon</button>

        <p id="finalAmount">Total: ₹${total}</p>

        <button onclick="placeOrder()">Place Order ₹${total}</button>
    `;
}

/* =========================
   COUPON LOGIC
========================= */

function applyCoupon(total) {
    const input = document.getElementById("couponInput");
    if (!input) return;

    const code = input.value.trim().toUpperCase();
    let discount = 0;

    if (code === "SAVE10") {
        discount = total * 0.1;
    } else if (code === "FLAT200") {
        discount = 200;
    } else {
        showToast("Invalid coupon", "error");
        return;
    }

    const finalAmount = Math.max(total - discount, 0);

    document.getElementById("finalAmount").innerHTML = `
        Discount: ₹${discount}<br>
        <strong>Payable: ₹${finalAmount}</strong>
    `;

    showToast("Coupon applied");
}

/* =========================
   PLACE ORDER + INVENTORY UPDATE
========================= */

function placeOrder() {
    const cart = getCart();
    if (cart.length === 0) return;

    const inventory = JSON.parse(localStorage.getItem("inventory")) || [];

    cart.forEach(item => {
        const product = inventory.find(p => p.id === item.id);
        if (product) {
            product.stock -= item.quantity;
            if (product.stock < 0) product.stock = 0;
        }
    });

    localStorage.setItem("inventory", JSON.stringify(inventory));
    localStorage.removeItem("cart");

    showToast("Order placed successfully");

    renderCart();
    loadProducts(); // refresh stock on product page
}
