export function renderStoreHtml(products: any[]) {
    const productCards = products.map(p => `
        <div class="product-card" style="border: 1px solid #ddd; padding: 15px; border-radius: 8px;">
            <img src="${p.image_url || 'https://via.placeholder.com/150'}" alt="${p.name}" style="width:100%">
            <h3>${p.name}</h3>
            <p>${p.description}</p>
            <p><strong>$${p.price}</strong></p>
            <button onclick="addToCart(${p.id})">Añadir al carrito</button>
        </div>
    `).join('');

    return `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <title>Mi Tienda D1</title>
        <link rel="stylesheet" href="https://static.integrations.cloudflare.com/styles.css">
        <style>
            .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; padding: 20px; }
            header { display: flex; justify-content: space-between; align-items: center; padding: 0 20px; background: #f4f4f4; }
        </style>
      </head>
      <body>
        <header>
          <h1>Tienda Pro</h1>
          <div id="cart-status">🛒 Carrito (0)</div>
        </header>
        <main>
          <div class="grid">${productCards}</div>
        </main>
        <script>
            let cart = [];
            function addToCart(id) {
                cart.push(id);
                document.getElementById('cart-status').innerText = '🛒 Carrito (' + cart.length + ')';
                alert('Producto añadido!');
            }
        </script>
      </body>
    </html>`;
}