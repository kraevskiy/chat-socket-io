import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const manifestForPlugin: Partial<VitePWAOptions> = {
    registerType: "prompt",
    includeAssets: [
      "favicon.ico", "apple-touch-icon.png"
    ],
    manifest: {
      name: "Kraievskyi chat",
      short_name: "Ramb chat",
      description: "Kraievskyi chat for socket-io && nodejs",
      icons: [
        {
          src: "/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png"
        },
        {
          src: "/apple-touch-icon.png",
          sizes: "180x180",
          type: "image/png",
          purpose: "apple touch icon"
        },
        {
          src: "/maskable_icon.png",
          sizes: "692x662",
          type: "image/png",
          purpose: "any maskable"
        },
      ],
      theme_color: "#020817",
      background_color: "#020817",
      display: "standalone",
      scope: "/",
      start_url: "/",
      orientation: "portrait"
    }
  }
;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:8000"
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id.toString().split("node_modules/")[1].split("/")[0].toString();
          }
        }
      }
    }
  }
});
