import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  test: {
    exclude: [],
    globals: true,
    environment: "jsdom",
    setupFiles: ["src/tests/setup.ts"],
  },
});
