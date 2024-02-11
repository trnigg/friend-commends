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
      //includeAssets: ["favicon.ico"],
      includeAssets: ["**/*"],
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
      workbox: {
        globPatterns: ["**/*"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.themoviedb\.org\/.*/i,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "tmdb-source-cache",
              cacheableResponse:{statuses:[0,200]}
            },
          },
          {
            urlPattern: /^https:\/\/image\.tmdb\.org\/.*/i,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "tmdb-image-cache",
              cacheableResponse:{statuses:[0,200]}
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "fonts-cache",
              cacheableResponse:{statuses:[0,200]}
            },
          },
          {
            urlPattern: /.*\/graphql/i,
            handler: "CacheFirst",
            options: {
              cacheName: "graphql-cache",
              cacheableResponse:{statuses:[0,200]}
            },
          },
          {
            // Match any request that ends with .png, .jpg, .jpeg or .svg.
            urlPattern: /\.(?:png|jpg|jpeg|svg|ico)$/,
    
            // Apply a cache-first strategy.
            handler: 'CacheFirst',
    
            options: {
              // Use a custom cache name.
              cacheName: 'images',
            },
          }
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
