

// 1. IMPORTAS la función desde tu archivo original

import { obtenerProductos } from './supa.js';

// 2. Creas la función encargada de pintar (renderizar) de manera local
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
                <p class="name">
                    ${producto.nombre}
                </p>
                <p class="price">
                    $${producto.precio}
                </p>
                <p class="description">
                    ${producto.descripcion}
                </p>
            </div>

            <div class="btn-shop" data-id="${producto.id}">
                <button>Comprar por WhatsApp</button>
            </div>  
        </div>
        `;
    });
}

// 3. Escuchas la carga de la página para ejecutar el flujo
window.addEventListener('DOMContentLoaded', async () => {
    const misProductos = await obtenerProductos(); // Viene importada de supa.js
    if (misProductos) {
        mostrarProductosEnPantalla(misProductos);
    }
});

document.addEventListener("click", (e) => {

    if (e.target.classList.contains("btn-shop")) {

        const id = Number(e.target.dataset.id);

        const producto = productos.find(
            p => p.id === id
        );

        const mensaje = `Hola, estoy interesado en ${producto.nombre}`;

        const url = `https://wa.me/573001234567?text=${encodeURIComponent(mensaje)}`;

        window.open(url, "_blank");
    }

});
