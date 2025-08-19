import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
resolve: {
  extensions: [".js", ".jsx", ".json"];
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
