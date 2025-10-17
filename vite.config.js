import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],

  //  Build optimizations
  build: {
    // Enable minification
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
      },
    },

    // Code splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor code
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "redux-vendor": ["@reduxjs/toolkit", "react-redux"],
          "ui-vendor": ["@material-tailwind/react", "framer-motion"],
          "swiper-vendor": ["swiper"],
          icons: ["react-icons", "lucide-react", "@heroicons/react"],
        },
      },
    },

    // Optimize chunk size
    chunkSizeWarningLimit: 1000,

    // Optimize CSS
    cssCodeSplit: true,

    // Source maps for production debugging (optional - disable for smaller bundle)
    sourcemap: false,
  },

  //  Performance optimizations
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "@reduxjs/toolkit",
      "react-redux",
    ],
  },

  server: {
    headers: {
      "Cache-Control": "public, max-age=604800", // أسبوع واحد
    },
  },
});
