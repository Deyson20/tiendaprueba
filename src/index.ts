import { renderStoreHtml } from "./renderHtml";
import { renderAdminHtml } from "./renderAdmin"; // Crearemos este archivo

export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        
        if (url.pathname.startsWith("/admin")) {
            const authHeader = request.headers.get("Authorization");
            
            // Usuario: Deyson20 | Password: Dey2026* // La cadena "Deyson20:Dey2026*" en Base64 es: "RGV5c29uMjA6RGV5MjAyNio="
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
            const data = await request.json();
            try {
                await env.DB.prepare(`
                    INSERT INTO products (name, description, price, stock, image_url, category_id)
                    VALUES (?, ?, ?, ?, ?, ?)
                `).bind(data.name, data.description, data.price, data.stock, data.image_url, data.category_id).run();
                
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
    },
} satisfies ExportedHandler<Env>;