//Codigo para las secciones del header
const enlaces = document.querySelectorAll('.linknav');

enlaces.forEach(enlace => {
    enlace.addEventListener('click',function(event){
        event.preventDefault();

        const destino = document.querySelector(this.getAttribute('href'));

        destino.scrollIntoView({
           behavior:'smooth'
        });
    });
});

//Codigo para la ficha de reserva
document.addEventListener("DOMContentLoaded", function() {
    const formularioReserva = document.querySelector(".formulario-reserva");

    formularioReserva.addEventListener("submit", function(event) {

        const fechaInicio = document.getElementById("fecha-inicio").value;
        const fechaFinal = document.getElementById("fecha-final").value;
        const aeropuerto = document.getElementById("aeropuerto").value;
        const auto = document.getElementById("auto").value;
        const hora = document.getElementById("hora").value;
        const nombreCompleto = document.getElementById("nombre-completo").value;
        const email = document.getElementById("email").value;

        if (new Date(fechaFinal) <= new Date(fechaInicio)) {
            alert("La fecha de fin debe ser posterior a la de inicio");
            return;
        }

        if (!fechaInicio || !fechaFinal || !aeropuerto || !auto || !hora || !nombreCompleto || !email) {
            alert("Por favor, completar todos los campos para poder realizar la reserva");
            return;
        }

        alert(`Reserva confirmada: \n\nFecha: ${fechaInicio} hasta ${fechaFinal} \n Aeropuerto: ${aeropuerto} \n Auto: ${auto} \n Horario de retiro: ${hora} \n Nombre Completo: ${nombreCompleto} \n Email: ${email}`);

        formularioReserva.reset();
    });
});



// Codigo del footer de consultas 
document.addEventListener("DOMContentLoaded", function() {
    const formulario = document.querySelector(".formulario-de-contacto form");
    const nombre = document.getElementById("nombre");
    const email = document.getElementById("email");
    const mensaje = document.getElementById("mensaje");

    formulario.addEventListener("submit", function(event) {
        if (nombre.value.trim() === "" || email.value.trim() === "" || mensaje.value.trim() === "") {
            alert("Por favor, complete todos los campos");
            return;  
        }

        alert("Gracias por tu mensaje. Nos pondremos en contacto pronto");

        nombre.value = "";
        email.value = "";
        mensaje.value = "";

    });
});

//Codigo de categoria de autos 
function mostrarCategoria(categoria) {
    const categorias = document.querySelectorAll('.categoria-contenido');
    categorias.forEach(cat=> cat.style.display = 'none');

    const categoriaSeleccionada = document.getElementById(categoria);
    if (categoriaSeleccionada) {
        categoriaSeleccionada.style.display = 'block';

        categoriaSeleccionada.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

window.addEventListener('load', () => {
    if (window.location.hash) {
        const categoria = window.location.harsh.substring(1);
        mostrarCategoria(categoria);
    }
});

//Codigo para el carrito 
const precios = {
    'peugeot-208': 50000,
    'ford-focus': 55000,
    'volkswagen-vento': 60000,
    'toyota-corolla': 65000,
    'renault-kwid': 45000,
    'fiat-cronos': 48000,
    'toyota-sw4': 80000,
    'chevrolet-tracker': 75000,
    'audi-sq3': 100000,
    'bmw-340i': 110000,
    'porsche-911': 150000
};

let carrito = [];
let total = 0;

const carritoBtn = document.getElementById('carrito-btn');
const modal = document.getElementById('carrito-modal');
const cerrarBtn = document.querySelector('.close');
const listaCarrito = document.getElementById('carrito-items');
const totalTexto = document.getElementById('carrito-total');
const cantidadTexto = document.getElementById('carrito-cantidad');

carritoBtn.onclick = function() {
    modal.style.display = "block";
}

cerrarBtn.onclick = function() {
    modal.style.display = "none";
}

function agregarAuto(auto) {
    let nombre = auto.replace('-', ' ');
    
    carrito.push({
        nombre: nombre,
        precio: precios[auto]
    });
    
    actualizarCarrito();
}

function actualizarCarrito() {
    listaCarrito.innerHTML = '';
    total = 0;
    
    if(carrito.length == 0) {
        listaCarrito.innerHTML = '<p>Carrito vacío</p>';
        totalTexto.innerHTML = 'Total: $0';
        cantidadTexto.innerHTML = '0';
        return;
    }
    
    for(let i = 0; i < carrito.length; i++) {
        total += carrito[i].precio;
        
        listaCarrito.innerHTML += `
            <div class="carrito-item">
                <span>${carrito[i].nombre}</span>
                <span>$${carrito[i].precio}</span>
                <button onclick="quitarAuto(${i})">Quitar</button>
            </div>
        `;
    }
    
    totalTexto.innerHTML = 'Total: $' + total;
    cantidadTexto.innerHTML = carrito.length;
}

function quitarAuto(indice) {
    carrito.splice(indice, 1);
    actualizarCarrito();
}

document.getElementById('vaciar-btn').onclick = function() {
    if(confirm('¿Vaciar carrito?')) {
        carrito = [];
        actualizarCarrito();
    }
}

document.getElementById('checkout-btn').onclick = function() {
    if(carrito.length > 0) {
        alert('¡Compra exitosa!');
        carrito = [];
        actualizarCarrito();
        modal.style.display = "none";
    } else {
        alert('El carrito está vacío');
    }
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

document.getElementById('agregar-btn').onclick = function() {
    let auto = document.getElementById('auto-select').value;
    if(auto) {
        agregarAuto(auto);
        document.getElementById('auto-select').value = '';
    } else {
        alert('Selecciona un auto');
    }
}

