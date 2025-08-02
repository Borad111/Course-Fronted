import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { viteStaticCopy } from "vite-plugin-static-copy"

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "public/_redirects", // path to your redirects file
          dest: ".",                // puts it in dist/
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
