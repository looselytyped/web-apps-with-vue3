import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

const vitestConfig = {
  test: {
    globals: true,
    environment: "jsdom",
  },
};

// https://vitejs.dev/config/
// prettier-ignore
export default defineConfig(({ command, mode }) => {
  return {
    plugins: [
      vue(
        mode === "test"
          ? {
            template: {
              compilerOptions: {
                isCustomElement: (tag) => {
                  return tag.startsWith("v-");
                },
              },
            },
          }
          : {}
      ),
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
      vuetify({
        autoImport: true,
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    test: vitestConfig.test,
  };
});
