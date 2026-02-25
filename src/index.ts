import { renderStoreHtml } from "./renderHtml";

export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        
        // RUTA: Listado de productos (Inicio)
        if (url.pathname === "/" || url.pathname === "/products") {
            const { results: products } = await env.DB.prepare(
                "SELECT * FROM products WHERE stock > 0"
            ).all();
            
            return new Response(renderStoreHtml(products), {
                headers: { "content-type": "text/html" },
            });
        }

        // RUTA: Detalle de producto (Ej: /product?id=1)
        if (url.pathname === "/product") {
            const id = url.searchParams.get("id");
            const product = await env.DB.prepare(
                "SELECT * FROM products WHERE id = ?"
            ).bind(id).first();

            if (!product) return new Response("Producto no encontrado", { status: 404 });
            
            return new Response(JSON.stringify(product), {
                headers: { "content-type": "application/json" },
            });
        }

        return new Response("Not Found", { status: 404 });
    },
} satisfies ExportedHandler<Env>; 