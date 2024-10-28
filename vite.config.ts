import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "*": {
        target: "https://www.instagram.com/",
        changeOrigin: true,
      },
    },
  },
});
