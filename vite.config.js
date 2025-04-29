import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: [".js", ".jsx"], // Ensure .jsx is included
  },
  eslint: {
    ignoreDuringBuild: true, // Ignore ESLint errors during build
  },
});
