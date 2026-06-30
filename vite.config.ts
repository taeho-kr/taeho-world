import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    // Build-time revision stamp shown in the hero ("REV …"). Evaluated when Vite
    // loads this config, so it tracks each build/deploy instead of going stale.
    __BUILD_DATE__: JSON.stringify(
      new Date().toISOString().slice(0, 10).replace(/-/g, '.')
    ),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

})
