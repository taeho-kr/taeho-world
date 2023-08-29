import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@/components": path.resolve(__dirname, "src/components"),
      "@/pages": path.resolve(__dirname, "src/pages"),
      "@/assets": path.resolve(__dirname, "src/assets"),
      "@/utils": path.resolve(__dirname, "src/utils"),
      "@/hooks": path.resolve(__dirname, "src/hooks"),
      "@/styles": path.resolve(__dirname, "src/styles"),
      "@/apis": path.resolve(__dirname, "src/apis"),
      "@/store": path.resolve(__dirname, "src/store"),
      "@/layouts": path.resolve(__dirname, "src/layouts"),
      "@/routes": path.resolve(__dirname, "src/routes"),
    },
  },
  server: {
    port: 829,
  },
});
