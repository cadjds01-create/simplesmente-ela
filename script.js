// Dados dos produtos
const products = [
    {
        id: 1,
        title: "Sutiã de Renda",
        description: "Sutiã delicado com detalhes em renda",
        price: 89.90,
        icon: "👙",
        colors: [
            { name: "Rosa Pink", hex: "#FF1493" },
            { name: "Preto", hex: "#000000" },
            { name: "Branco", hex: "#FFFFFF" }
        ],
        sizes: ["P", "M", "G", "GG"]
    },
    {
        id: 2,
        title: "Conjunto Sensual",
        description: "Conjunto completo com design moderno",
        price: 129.90,
        icon: "💕",
        colors: [
            { name: "Magenta", hex: "#D63384" },
            { name: "Preto", hex: "#000000" },
            { name: "Rosa Quente", hex: "#FF69B4" }
        ],
        sizes: ["P", "M", "G", "GG"]
    },
    {
        id: 3,
        title: "Camisola Luxo",
        description: "Camisola elegante em tecido premium",
        price: 159.90,
        icon: "✨",
        colors: [
            { name: "Branco", hex: "#FFFFFF" },
            { name: "Preto", hex: "#000000" },
            { name: "Rosa Bebê", hex: "#FFB6C1" }
        ],
        sizes: ["P", "M", "G", "GG"]
    },
    {
        id: 4,
        title: "Calcinha Conforto",
        description: "Calcinha macia e confortável para o dia a dia",
        price: 49.90,
        icon: "🎀",
        colors: [
            { name: "Rosa Quente", hex: "#FF69B4" },
            { name: "Preto", hex: "#000000" },
            { name: "Branco", hex: "#FFFFFF" }
        ],
        sizes: ["P", "M", "G", "GG"]
    },
    {
        id: 5,
        title: "Sutiã Sem Costura",
        description: "Sutiã invisível com tecnologia de segunda pele",
        price: 99.90,
        icon: "👗",
        colors: [
            { name: "Rosa Bebê", hex: "#FFB6C1" },
            { name: "Preto", hex: "#000000" },
            { name: "Branco", hex: "#FFFFFF" }
        ],
        sizes: ["P", "M", "G", "GG"]
    },
    {
        id: 6,
        title: "Penhoar Elegante",
        description: "Penhoar sofisticado para noites especiais",
        price: 189.90,
        icon: "👑",
        colors: [
            { name: "Magenta", hex: "#D63384" },
            { name: "Rosa Bebê", hex: "#FFB6C1" },
            { name: "Preto", hex: "#000000" }
        ],
        sizes: ["P", "M", "G", "GG"]
    }
];

// Variáveis globais
let cart = [];
let selectedSize = '';
let selectedColor = '';
let currentProduct = null;

// Elementos do DOM
const productsGrid = document.getElementById('productsGrid');
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.querySelector('.cart-count');
const closeCart = document.getElementById('closeCart');
const productModal = document.getElementById('productModal');
const closeModal = document.getElementById('closeModal');
const addToCartBtn = document.getElementById('addToCartBtn');
const menuToggle = document.getElementById('menuToggle');

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    setupEventListeners();
    setupQuantityControls();
});

// Carregar produtos
function loadProducts() {
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card" onclick="openProductModal(${product.id})">
            <div class="product-image">${product.icon}</div>
            <div class="product-info">
                <div class="product-title">${product.title}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-footer">
                    <div class="product-price">R$ ${product.price.toFixed(2)}</div>
                    <div class="product-rating">★★★★★</div>
                </div>
            </div>
            <button onclick="event.stopPropagation(); quickAddToCart(${product.id})">
                <i class="fas fa-shopping-bag"></i> Adicionar
            </button>
        </div>
    `).join('');
}

// Abrir modal de produto
function openProductModal(productId) {
    currentProduct = products.find(p => p.id === productId);
    selectedSize = '';
    selectedColor = currentProduct.colors[0].hex;

    document.getElementById('modalImage').textContent = currentProduct.icon;
    document.getElementById('modalTitle').textContent = currentProduct.title;
    document.getElementById('modalDescription').textContent = currentProduct.description;
    document.getElementById('modalPrice').textContent = `R$ ${currentProduct.price.toFixed(2)}`;
    document.getElementById('quantity').value = 1;

    // Carregar cores corretamente
    const colorsContainer = document.getElementById('colors');
    colorsContainer.innerHTML = currentProduct.colors.map((color, index) => `
        <button class="color-option ${index === 0 ? 'active' : ''}" 
            style="background-color: ${color.hex}; border-color: ${color.hex};" 
            onclick="selectColor('${color.hex}', '${color.name}')"
            title="${color.name}"
            data-color="${color.hex}">
        </button>
    `).join('');

    // Resetar tamanhos
    const sizesContainer = document.getElementById('sizes');
    sizesContainer.querySelectorAll('.size-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    productModal.classList.add('active');
}

// Selecionar cor