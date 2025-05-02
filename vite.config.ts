
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

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
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor chunks for better caching
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: [
            '@radix-ui/react-slot',
            'class-variance-authority',
            'lucide-react',
            'sonner',
          ]
        }
      }
    },
    // Enable asset hashing for better cache busting
    assetsInlineLimit: 4096,
    sourcemap: false,
    // Configure output directory
    outDir: 'dist',
    // Add cache-control headers
    cssCodeSplit: true
  },
}));
