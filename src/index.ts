import { renderStoreHtml } from "./renderHtml";
import { renderAdminHtml } from "./renderAdmin";

export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        
        // --- SEGURIDAD ---
        if (url.pathname.startsWith("/admin")) {
            const authHeader = request.headers.get("Authorization");
            const expectedAuth = "Basic RGV5c29uMjA6RGV5MjAyNio=";
            
            if (!authHeader || authHeader !== expectedAuth) {
                return new Response("Acceso denegado. Introduce tus credenciales.", {
                    status: 401,
                    headers: {
                        "WWW-Authenticate": 'Basic realm="Admin Panel"',
                    },
                });
            }
        }
        
        // 1. RUTA: PANEL DE ADMINISTRACIÓN (GET)
        if (url.pathname === "/admin") {
            return new Response(renderAdminHtml(), {
                headers: { "content-type": "text/html" },
            });
        }
        
        // 2. RUTA: GUARDAR PRODUCTO (POST)
        if (url.pathname === "/admin/save" && request.method === "POST") {
            try {
                const data = await request.json();
                await env.DB.prepare(`
                    INSERT INTO products (name, price, category, description, images, video, variants, bodegaName, freeShipping, stock)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `).bind(
                    data.name,
                    data.price,
                    data.category,
                    data.description,
                    data.images,
                    data.video,
                    data.variants,
                    data.bodegaName,
                    data.freeShipping ? 1 : 0,
                    data.stock
                ).run();
                
                return new Response(JSON.stringify({ success: true }), {
                    headers: { "content-type": "application/json" }
                });
            } catch (e) {
                return new Response(JSON.stringify({ error: e.message }), { status: 500 });
            }
        }
        
        // 3. RUTA: TIENDA (Pestaña Principal)
        if (url.pathname === "/" || url.pathname === "/products") {
            const { results: products } = await env.DB.prepare("SELECT * FROM products").all();
            return new Response(renderStoreHtml(products), {
                headers: { "content-type": "text/html" },
            });
        }
        
        return new Response("Not Found", { status: 404 });
    }
} satisfies ExportedHandler<Env>;