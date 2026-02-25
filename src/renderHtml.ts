export function renderStoreHtml(products: any[]) {
    const productCards = products.map(p => `
        <div class="group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div class="aspect-h-1 aspect-w-1 bg-gray-200 group-hover:opacity-75 sm:h-64">
                <img src="${p.image_url || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400&h=400&fit=crop'}" 
                     alt="${p.name}" 
                     class="h-full w-full object-cover object-center">
            </div>
            <div class="flex flex-1 flex-col p-4 space-y-2">
                <h3 class="text-sm font-medium text-gray-900">
                    <a href="/product?id=${p.id}">
                        <span aria-hidden="true" class="absolute inset-0"></span>
                        ${p.name}
                    </a>
                </h3>
                <p class="text-sm text-gray-500 line-clamp-2">${p.description}</p>
                <div class="flex flex-1 flex-col justify-end">
                    <p class="text-lg font-bold text-indigo-600">$${p.price.toFixed(2)}</p>
                    <button onclick="event.stopPropagation(); addToCart(${p.id}, '${p.name}', ${p.price})" 
                            class="mt-4 w-full bg-indigo-600 border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Añadir al carrito
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    return `
    <!DOCTYPE html>
    <html lang="es" class="h-full bg-gray-50">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>TechStore | Mi Tienda Online</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body class="flex flex-col h-full">
        <nav class="bg-white shadow-sm sticky top-0 z-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16 items-center">
                    <div class="flex-shrink-0 flex items-center cursor-pointer" onclick="window.location.href='/'">
                        <span class="text-2xl font-black text-indigo-600 tracking-tight">TECH<span class="text-gray-900">STORE</span></span>
                    </div>
                    <div class="flex items-center space-x-4">
                        <button class="text-gray-600 hover:text-gray-900">Buscar</button>
                        <div class="relative cursor-pointer" onclick="toggleCart()">
                            <span class="text-gray-600">🛒</span>
                            <span id="cart-count" class="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">0</span>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

        <div class="bg-indigo-900 py-16">
            <div class="max-w-7xl mx-auto px-4 text-center">
                <h1 class="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Nueva Colección 2024</h1>
                <p class="mt-4 text-xl text-indigo-100 italic font-light text-shadow">Los mejores gadgets al mejor precio.</p>
            </div>
        </div>

        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 class="text-2xl font-bold tracking-tight text-gray-900 mb-8">Productos Destacados</h2>
            <div class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                ${productCards}
            </div>
        </main>

        <footer class="bg-white border-t mt-auto py-8">
            <div class="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
                &copy; 2024 TechStore. Todos los derechos reservados.
            </div>
        </footer>

        <script>
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            updateCartUI();

            function addToCart(id, name, price) {
                cart.push({id, name, price});
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartUI();
                alert('¡' + name + ' añadido al carrito!');
            }

            function updateCartUI() {
                document.getElementById('cart-count').innerText = cart.length;
            }

            function toggleCart() {
                alert('Carrito actual: ' + cart.length + ' productos. Subtotal: $' + cart.reduce((a, b) => a + b.price, 0).toFixed(2));
            }
        </script>
      </body>
    </html>`;
}