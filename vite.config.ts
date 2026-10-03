import path from "node:path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": path.resolve(import.meta.dirname, "./src") },
    // An editor extension writes .js copies beside the .ts sources; the .ts file is always the truth.
    extensions: [".tsx", ".ts", ".mjs", ".js", ".jsx", ".json"],
  },
})
