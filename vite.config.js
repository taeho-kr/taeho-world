import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Base alias for src directory
      "@/components": "@/components",
      "@/pages": "@/pages",
      "@/assets": "@/assets",
      "@/utils": "@/utils",
      "@/hooks": "@/hooks",
      "@/styles": "@/styles",
      "@/apis": "@/apis",
      "@/store": "@/store",
      "@/layouts": "@/layouts",
      "@/routes": "@/routes",
    },
  },
  server: {
    port: 829,
  },
});
