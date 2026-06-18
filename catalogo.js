import { obtenerProductos } from './supa.js';

let misProductos = [];

function mostrarProductosEnPantalla(productos) {
    const contenedor = document.getElementById("contenedor-productos");
    contenedor.innerHTML = "";

    productos.forEach(producto => {
        contenedor.innerHTML += `
        <div class="card">
            <div class="card-img">
                <img src="${producto.imagen}" alt="${producto.nombre}">
            </div>

            <div class="card-info">
                <p class="name">${producto.nombre}</p>
                <p class="price">$${producto.precio}</p>
                <p class="description">${producto.descripcion}</p>
            </div>

            <div class="btn-shop" data-id="${producto.id}">
                <button>Comprar por WhatsApp</button>
            </div>
        </div>
        `;
    });
}

window.addEventListener('DOMContentLoaded', async () => {
    misProductos = await obtenerProductos();

    if (misProductos) {
        mostrarProductosEnPantalla(misProductos);
    }
});

document.addEventListener("click", (e) => {

    const btnShop = e.target.closest(".btn-shop");

    if (!btnShop) return;

    const id = Number(btnShop.dataset.id);

    const producto = misProductos.find(
        p => p.id === id
    );

    if (!producto) return;

    const mensaje = `Hola, estoy interesado en ${producto.nombre}`;

    const url = `https://wa.me/573021287930?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");
});
