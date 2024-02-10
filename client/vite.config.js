import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      //devOptions: { enabled: true },
      includeAssets: ["favicon.ico"],
      manifest: {
        name: "Friend-commends",
        short_name: "Friend-commends",
        description: "My Awesome App description",
        theme_color: "#ffffff",
        icons: [
          {
            src: "images/logo-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "images/logo-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  server: {
    port: 3000,
    open: true,
    proxy: {
      "/graphql": {
        target: "http://localhost:3001",
        secure: false,
        changeOrigin: true,
      },
    },
  },
});
