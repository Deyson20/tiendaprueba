export function renderAdminHtml() {
    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Admin Pro - Gestión de Tienda</title>
        <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-gray-100 p-8">
        <div class="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg">
            <h1 class="text-2xl font-bold mb-6 text-indigo-600">Agregar Nuevo Producto</h1>
            
            <form id="productForm" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium">Nombre del Producto</label>
                    <input type="text" id="name" name="name" class="w-full border p-2 rounded" required>
                </div>
                <div>
                    <label class="block text-sm font-medium">Descripción</label>
                    <textarea id="description" name="description" class="w-full border p-2 rounded"></textarea>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium">Precio ($)</label>
                        <input type="number" step="0.01" id="price" name="price" class="w-full border p-2 rounded" required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium">Stock</label>
                        <input type="number" id="stock" name="stock" class="w-full border p-2 rounded" required>
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium">URL de la Imagen</label>
                    <input type="url" id="image_url" name="image_url" class="w-full border p-2 rounded" placeholder="https://ejemplo.com/foto.jpg">
                </div>
                <div>
                    <label class="block text-sm font-medium">Categoría (ID)</label>
                    <select id="category_id" name="category_id" class="w-full border p-2 rounded">
                        <option value="1">Electrónica</option>
                        <option value="2">Ropa</option>
                        <option value="3">Hogar</option>
                    </select>
                </div>
                <button type="submit" class="w-full bg-indigo-600 text-white py-2 rounded-lg font-bold hover:bg-indigo-700">
                    Guardar en Base de Datos
                </button>
            </form>
            <div id="status" class="mt-4 text-center hidden"></div>
        </div>

        <script>
            document.getElementById('productForm').onsubmit = async (e) => {
                e.preventDefault();
                const status = document.getElementById('status');
                const formData = {
                    name: document.getElementById('name').value,
                    description: document.getElementById('description').value,
                    price: parseFloat(document.getElementById('price').value),
                    stock: parseInt(document.getElementById('stock').value),
                    image_url: document.getElementById('image_url').value,
                    category_id: parseInt(document.getElementById('category_id').value)
                };

                status.classList.remove('hidden');
                status.innerText = 'Guardando...';

                const response = await fetch('/admin/save', {
                    method: 'POST',
                    body: JSON.stringify(formData),
                    headers: { 'Content-Type': 'application/json' }
                });

                if (response.ok) {
                    status.innerText = '✅ ¡Producto guardado con éxito!';
                    status.className = 'mt-4 text-center text-green-600';
                    document.getElementById('productForm').reset();
                } else {
                    status.innerText = '❌ Error al guardar';
                    status.className = 'mt-4 text-center text-red-600';
                }
            };
        </script>
    </body>
    </html>`;
}