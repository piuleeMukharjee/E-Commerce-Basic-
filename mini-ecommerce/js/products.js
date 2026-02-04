/* =========================
   LOAD PRODUCTS (JSON)
========================= */

async function loadProducts() {
    try {
        const response = await fetch("data/products.json");
        const data = await response.json();

        const savedInventory = JSON.parse(localStorage.getItem("inventory"));

        if (Array.isArray(savedInventory) && savedInventory.length > 0) {
            products = savedInventory;
        } else {
            products = data;
            localStorage.setItem("inventory", JSON.stringify(data));
        }

        renderProducts();
    } catch (err) {
        console.error(err);
        showToast("Failed to load products", "error");
    }
}


/* =========================
   RENDER PRODUCTS
========================= */

function renderProducts() {
    const container = document.getElementById("productContainer");
    const searchInput = document.getElementById("searchInput");

    if (!container || !searchInput) return;

function applySearch() {
    const keyword = searchInput.value.trim().toLowerCase();

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(keyword) ||
        product.category?.toLowerCase().includes(keyword)
    );

    renderList(filteredProducts);
}

// Search event
searchInput.oninput = applySearch;


    function renderList(list) {
        container.innerHTML = "";

        if (list.length === 0) {
            container.innerHTML = `<p class="empty">No products available</p>`;
            return;
        }

        list.forEach(product => {
            const card = document.createElement("div");
            card.className = "product-card";

            const outOfStock = product.stock <= 0;

            card.innerHTML = `
    <img src="${product.image}" alt="${product.name}" class="product-image">

    <h3>${product.name}</h3>
    <p class="price">₹${product.price}</p>
    <p class="stock">
        ${product.stock > 0 ? `In stock: ${product.stock}` : "Out of stock"}
    </p>

    <button class="add-btn" ${product.stock === 0 ? "disabled" : ""}>
        Add to Cart
    </button>

    <button class="buy-btn" ${product.stock === 0 ? "disabled" : ""}>
        Buy Now
    </button>
`;


            if (!outOfStock) {
                card.querySelector(".add-btn").onclick = () => {
                    addToCart(product.id);
                };

                card.querySelector(".buy-btn").onclick = () => {
                    addToCart(product.id);
                    location.hash = "#/cart";
                };
            }

            container.appendChild(card);
        });
    }

    renderList(products);

    searchInput.oninput = () => {
        const keyword = searchInput.value.toLowerCase();
        renderList(
            products.filter(p =>
                p.name.toLowerCase().includes(keyword)
            )
        );
    };
}

/* =========================
   INIT
========================= */
loadProducts();
