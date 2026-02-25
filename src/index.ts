import { renderStoreHtml } from "./renderHtml";

export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        
        if (url.pathname === "/" || url.pathname === "/products") {
            // Obtenemos los productos que insertaste en el paso anterior
            const { results: products } = await env.DB.prepare(
                "SELECT * FROM products"
            ).all();
            
            return new Response(renderStoreHtml(products), {
                headers: { "content-type": "text/html" },
            });
        }

        return new Response("Not Found", { status: 404 });
    },
} satisfies ExportedHandler<Env>;