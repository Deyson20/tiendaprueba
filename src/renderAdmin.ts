export function renderAdminHtml() {
    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>Admin Pro - DEYXPRESS</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
      <link href="https://cdn.jsdelivr.net/npm/quill@2.0.0/dist/quill.snow.css" rel="stylesheet" />
      <script src="https://cdn.jsdelivr.net/npm/quill@2.0.0/dist/quill.js"></script>
    </head>
    <body class="bg-slate-50 min-h-screen">
      <div class="max-w-4xl mx-auto py-10 px-4">
        <div class="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          <div class="bg-indigo-600 p-6">
            <h1 class="text-white text-2xl font-bold"><i class="fas fa-box-open mr-2"></i> DEYXPRESS Admin</h1>
            <p class="text-indigo-100">Gestión avanzada de inventario y bodegas</p>
          </div>

          <form id="productForm" class="p-8 space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">Nombre del Producto</label>
                <input type="text" id="name" class="w-full border-slate-200 rounded-lg p-3 border focus:ring-2 focus:ring-indigo-500" placeholder="Ej: Smartphone X" required>
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">Precio de Venta ($)</label>
                <input type="number" step="0.01" id="price" class="w-full border-slate-200 rounded-lg p-3 border focus:ring-2 focus:ring-indigo-500" required>
              </div>

              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">Categoría</label>
                <select id="category" class="w-full border-slate-200 rounded-lg p-3 border">
                  <option>Tecnología</option>
                  <option>Ropa</option>
                  <option>Hogar</option>
                  <option>Salud y Belleza</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">Nombre de la Bodega</label>
                <input type="text" id="bodegaName" class="w-full border-slate-200 rounded-lg p-3 border" placeholder="Ej: Bodega Central">
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">Descripción Detallada</label>
              <div id="editor-container" class="h-48 bg-white"></div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">URL Imágenes (Separadas por coma)</label>
                <textarea id="images" class="w-full border-slate-200 rounded-lg p-3 border h-24" placeholder="https://img1.jpg, https://img2.jpg"></textarea>
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">URL Video (YouTube/Directo)</label>
                <input type="url" id="video" class="w-full border-slate-200 rounded-lg p-3 border">
                <div class="mt-4 flex items-center">
                  <input type="checkbox" id="freeShipping" class="w-5 h-5 text-indigo-600 rounded">
                  <label for="freeShipping" class="ml-2 text-sm font-medium text-slate-700">¿Envío Gratis?</label>
                </div>
              </div>
            </div>

            <div class="bg-slate-50 p-4 rounded-xl border border-dashed border-slate-300">
               <label class="block text-sm font-semibold text-slate-700 mb-2">Variantes (JSON: Tallas/Colores)</label>
               <input type="text" id="variants" class="w-full border-slate-200 rounded-lg p-3 border" placeholder='[{"talla":"M", "color":"Rojo"}]'>
            </div>

            <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-[1.01] shadow-lg">
              <i class="fas fa-save mr-2"></i> PUBLICAR PRODUCTO EN LA TIENDA
            </button>
          </form>
          <div id="responseMsg" class="p-4 text-center hidden font-bold"></div>
        </div>
      </div>

      <script>
        const quill = new Quill('#editor-container', { theme: 'snow' });

        document.getElementById('productForm').onsubmit = async (e) => {
          e.preventDefault();
          const btn = e.target.querySelector('button');
          btn.disabled = true;
          btn.innerText = 'PROCESANDO...';

          const formData = {
            name: document.getElementById('name').value,
            price: parseFloat(document.getElementById('price').value),
            category: document.getElementById('category').value,
            description: quill.root.innerHTML,
            images: JSON.stringify(document.getElementById('images').value.split(',')),
            video: document.getElementById('video').value,
            variants: document.getElementById('variants').value,
            bodegaName: document.getElementById('bodegaName').value,
            freeShipping: document.getElementById('freeShipping').checked,
            stock: 100 // Valor por defecto
          };

          const res = await fetch('/admin/save', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {'Content-Type': 'application/json'}
          });

          const msg = document.getElementById('responseMsg');
          msg.classList.remove('hidden');
          if(res.ok) {
            msg.innerText = "✅ PRODUCTO GUARDADO EN CLOUDFLARE D1";
            msg.className = "p-4 text-center text-green-600 bg-green-50";
            document.getElementById('productForm').reset();
            quill.setContents([]);
          } else {
            msg.innerText = "❌ ERROR AL GUARDAR";
            msg.className = "p-4 text-center text-red-600 bg-red-50";
          }
          btn.disabled = false;
          btn.innerHTML = '<i class="fas fa-save mr-2"></i> PUBLICAR PRODUCTO EN LA TIENDA';
        };
      </script>
    </body>
    </html>`;
}