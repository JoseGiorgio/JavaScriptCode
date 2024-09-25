// Simulador de productos
const productos = [
    { id: 1, nombre: 'Ventana de Aluminio', precio: 1200 },
    { id: 2, nombre: 'Puerta de Madera', precio: 2500 },
    { id: 3, nombre: 'Ventana Corrediza', precio: 1700 },
  ];
  
  // DOM
  const productContainer = document.getElementById('products');
  const cartContainer = document.getElementById('cart-items');
  const clearCartButton = document.getElementById('clear-cart');
  
  // Función mostrar productos
  function mostrarProductos() {
    productContainer.innerHTML = '';
    productos.forEach(producto => {
      const productElement = document.createElement('div');
      productElement.classList.add('product');
      productElement.innerHTML = `
        <span>${producto.nombre} - $${producto.precio}</span>
        <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
      `;
      productContainer.appendChild(productElement);
    });
  }
  
  // Función agregar productos al carrito
  function agregarAlCarrito(idProducto) {
    let carrito = obtenerCarrito();
    const producto = productos.find(p => p.id === idProducto);
    carrito.push(producto);
    guardarCarrito(carrito);
    mostrarCarrito();
  }
  
  // Función mostrar el carrito
  function mostrarCarrito() {
    cartContainer.innerHTML = '';
    let carrito = obtenerCarrito();
    carrito.forEach((producto, index) => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('product');
      cartItem.innerHTML = `
        <span>${producto.nombre} - $${producto.precio}</span>
        <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
      `;
      cartContainer.appendChild(cartItem);
    });
  }
  
  // Función eliminar productos del carrito
  function eliminarDelCarrito(index) {
    let carrito = obtenerCarrito();
    carrito.splice(index, 1);
    guardarCarrito(carrito);
    mostrarCarrito();
  }
  
  // Función para obtener el carrito del localStorage
  function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('carrito')) || [];
  }
  
  // Función para guardar el carrito en localStorage
  function guardarCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }
  
  // Función vaciar el carrito
  function vaciarCarrito() {
    localStorage.removeItem('carrito');
    mostrarCarrito();
  }
  
  // Event Listener para vaciar el carrito
  clearCartButton.addEventListener('click', vaciarCarrito);
  
  // Inicialización
  mostrarProductos();
  mostrarCarrito();