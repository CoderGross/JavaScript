const products = [
    { id: 1, name: 'Dominus', price: 30, image: './assets/dominus.webp' },
    { id: 2, name: 'Fennec', price: 50, image: './assets/fennec.webp' },
    { id: 3, name: 'Masamune', price: 20, image: './assets/masamune.webp' },
    { id: 4, name: 'Nisan Silvia', price: 35, image: './assets/nisan silvia.webp' },
    { id: 5, name: 'Porsche', price: 25, image: './assets/porsche.webp' },
    { id: 6, name: 'Nimbus', price: 15, image: './assets/nimbus.webp' },
    { id: 7, name: 'CyberTruck', price: 60, image: './assets/cybertruck.webp' },
    { id: 8, name: 'Rayo', price: 70, image: './assets/rayo.webp' },
    { id: 9, name: 'Formula 1', price: 15, image: './assets/formula 1.webp' },
    { id: 10, name: 'Nisan Skyline', price: 40, image: './assets/nisan skyline.webp' },
    { id: 11, name: 'Takumi', price: 20, image: './assets/takumi.webp' },
    { id: 12, name: 'Scarab', price: 15, image: './assets/scarab.webp' }
];

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function mostrarProductos(products) {
    const productList = document.getElementById('producto-lista');
    productList.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('producto');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Precio: $${product.price}</p>
            <button onclick="addToCart(${product.id})">Añadir al Carrito</button>
        `;
        productList.appendChild(productDiv);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        carrito.push(product);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito();
    }
}

function mostrarCarrito() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';
    const total = carrito.reduce((acc, product) => {
        const itemDiv = document.createElement('li');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="cart-details">
                <h4>${product.name}</h4>
                <p>Precio: $${product.price}</p>
            </div>
            <button onclick="removeFromCart(${product.id})">Eliminar</button>
        `;
        cartItems.appendChild(itemDiv);
        return acc + product.price;
    }, 0);
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

function removeFromCart(productId) {
    carrito = carrito.filter(product => product.id !== productId);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}

function realizarCompra() {
    if (carrito.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Hubo un problema",
            text: "El pago a sido rechazado",
            footer: '<a href="#productos">Vuelva a selecionar el articulo</a>'
          });
        return;
    }
    Swal.fire({
        position: "top",
        icon: "success",
        title: "Su compra se ha realizado con exito!",
        showConfirmButton: false,
        timer: 1900
      });

    carrito = [];
    localStorage.removeItem('carrito');
    mostrarCarrito();
}
function buscarProductos() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm));
    mostrarProductos(filteredProducts);
}
document.getElementById('search-input').addEventListener('input', buscarProductos);
document.getElementById('checkout').addEventListener('click', () => {
    realizarCompra();
});

mostrarProductos(products);