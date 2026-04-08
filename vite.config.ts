import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv, type Plugin } from "vite";

/**
 * Dev-only plugin that serves /api/chat using the same handler
 * as the Vercel serverless function — no need for `vercel dev`.
 */
function devApiPlugin(): Plugin {
  return {
    name: "dev-api",
    configureServer(server) {
      const env = loadEnv("development", process.cwd(), "");
      process.env.GROQ_API_KEY ??= env.GROQ_API_KEY;

      server.middlewares.use("/api/chat", async (req, res) => {
        let body = "";
        for await (const chunk of req) body += chunk;

        const webRequest = new Request("http://localhost/api/chat", {
          method: req.method,
          headers: { "Content-Type": "application/json" },
          body: req.method !== "GET" ? body : undefined,
        });

        try {
          const mod = await server.ssrLoadModule("/api/chat.ts");
          const handler = mod.default as (req: Request) => Promise<Response>;
          const webResponse = await handler(webRequest);
          const data = await webResponse.json();

          res.writeHead(webResponse.status, { "Content-Type": "application/json" });
          res.end(JSON.stringify(data));
        } catch (err) {
          console.error("[dev-api]", err);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Dev server error" }));
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), devApiPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom"],
          "vendor-motion": ["motion"],
          "vendor-icons": ["lucide-react"],
        },
      },
    },
  },
  server: {
    hmr: process.env.DISABLE_HMR !== "true",
  },
});
