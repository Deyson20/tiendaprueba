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
            <p class="text-indigo-100">Gestión avanzada de inventario</p>
          </div>

          <form id="productForm" class="p-8 space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">Nombre del Producto</label>
                <input type="text" id="name" class="w-full border-slate-200 rounded-lg p-3 border" required>
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">Precio ($)</label>
                <input type="number" step="0.01" id="price" class="w-full border-slate-200 rounded-lg p-3 border" required>
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">Descripción Detallada</label>
              <div id="editor-container" class="h-48 bg-white"></div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">URLs Imágenes (comas)</label>
                <textarea id="images" class="w-full border-slate-200 rounded-lg p-3 border h-24"></textarea>
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">Bodega</label>
                <input type="text" id="bodegaName" class="w-full border-slate-200 rounded-lg p-3 border">
                <div class="mt-4 flex items-center">
                  <input type="checkbox" id="freeShipping" class="w-5 h-5 text-indigo-600 rounded">
                  <label for="freeShipping" class="ml-2 text-sm font-medium">¿Envío Gratis?</label>
                </div>
              </div>
            </div>

            <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg">
              PUBLICAR PRODUCTO
            </button>
          </form>
          <div id="responseMsg" class="p-4 text-center hidden font-bold"></div>
        </div>
      </div>

      <script>
        const quill = new Quill('#editor-container', { theme: 'snow' });
        document.getElementById('productForm').onsubmit = async (e) => {
          e.preventDefault();
          const formData = {
            name: document.getElementById('name').value,
            price: parseFloat(document.getElementById('price').value),
            category: "Tecnología", 
            description: quill.root.innerHTML,
            images: JSON.stringify(document.getElementById('images').value.split(',').map(s => s.trim())),
            video: "",
            variants: "[]",
            bodegaName: document.getElementById('bodegaName').value,
            freeShipping: document.getElementById('freeShipping').checked,
            stock: 100
          };

          const res = await fetch('/admin/save', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {'Content-Type': 'application/json'}
          });

          const msg = document.getElementById('responseMsg');
          msg.classList.remove('hidden');
          if(res.ok) {
            msg.innerText = "✅ PRODUCTO GUARDADO";
            msg.className = "p-4 text-center text-green-600 bg-green-50";
            e.target.reset();
            quill.setContents([]);
          } else {
            msg.innerText = "❌ ERROR AL GUARDAR";
            msg.className = "p-4 text-center text-red-600 bg-red-50";
          }
        };
      </script>
    </body>
    </html>`;
}