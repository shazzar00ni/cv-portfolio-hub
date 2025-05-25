import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    minify: 'terser', // Use Terser for better minification
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs in production
        drop_debugger: true, // Remove debugger statements
        pure_funcs: ['console.log'], // Remove console.log calls
      },
      output: {
        comments: false, // Remove comments
      }
    },
    cssMinify: true, // Ensure CSS minification
    cssCodeSplit: true, // Split CSS for better caching
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
  },
}));
