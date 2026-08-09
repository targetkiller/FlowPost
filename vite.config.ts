import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      allow: [projectRoot, "/Users/tq/Documents/Financial Report/Summary"],
    },
  },
});
