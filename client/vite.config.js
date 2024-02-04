import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(),'');
    return{
    define: {
      'process.env.API_BEARER_TOKEN': JSON.stringify('eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZjJiN2ZmOTBmNTAyYmNjNThlYTdhNDFkY2I1NmY0ZiIsInN1YiI6IjY1YmI2NzY4NzY0NmZkMDE2M2JkNjNmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nX_rJ4wKwRyqwUdyHNSxC2QSwq2GTG3Qm30KW5g3Gmk')
    },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      //devOptions: { enabled: true },
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
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
}});
