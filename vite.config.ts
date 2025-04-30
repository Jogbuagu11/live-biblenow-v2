
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['/lovable-uploads/d5a19a0d-a447-4228-8d0b-0c537b5fe56f.png'],
      manifest: {
        name: 'BibleNOW',
        short_name: 'BibleNOW',
        description: 'A modern Bible livestream platform',
        theme_color: '#1e293b',
        icons: [
          {
            src: '/lovable-uploads/d5a19a0d-a447-4228-8d0b-0c537b5fe56f.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/lovable-uploads/d5a19a0d-a447-4228-8d0b-0c537b5fe56f.png',
            sizes: '512x512',
            type: 'image/png',
          }
        ]
      }
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
