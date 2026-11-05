import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import UnoCSS from "unocss/vite";

import VueRouter from "vue-router/vite";

import { existsSync } from "node:fs";
import { resolve } from "node:path";

import dts from "vite-plugin-dts";

const externalPackages = [
  "vue",
  /^vue\//,

  "vue-router",
  /^vue-router\//,

  "pinia",
  /^pinia\//,

  "pinia-plugin-persistedstate",
  /^pinia-plugin-persistedstate\//,

  "ant-design-vue",
  /^ant-design-vue\//,

  "@ant-design/icons-vue",
  /^@ant-design\/icons-vue(?:\/.*)?$/,

  "dexie",
  /^dexie\//,

  /^@docyai(\/|$)/,
];

const reteSideEffectFree = [/\/lib\/docyai-model\//];

export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const isLib = env.BUILD_MODE === "lib";
  const isReteLib = env.BUILD_MODE === "lib-rete";

  const apiTarget = env.API_TARGET || env.VITE_API_TARGET;

  if (!apiTarget && command === "serve") {
    throw new Error(
      "[vite] API_TARGET is not set. Copy .env.example to .env, set " +
        "API_TARGET to your backend (e.g. http://127.0.0.1:3000), then restart the dev server.",
    );
  }

  const hasReteSource = existsSync(
    resolve(import.meta.dirname, "src/rete-entry.ts"),
  );

  return {
    plugins: [
      VueRouter({
        dts: "src/types/typed-router.d.ts",
        routesFolder: [{ src: "src/pages" }],
      }),
      vue(),
      vueJsx(),
      UnoCSS(),
      ...(isLib
        ? [
            dts({
              tsconfigPath: "./tsconfig.app.json",
              entryRoot: "src",
              outDirs: "dist",
              insertTypesEntry: true,
              cleanVueFileName: true,
            }),
          ]
        : []),
    ],
    resolve: {
      alias: {
        ...(isLib
          ? {}
          : hasReteSource
            ? {
                "@docyai/style.css": resolve(
                  import.meta.dirname,
                  "src/assets/styles/style.scss",
                ),
                "@docyai/rete": resolve(
                  import.meta.dirname,
                  "src/rete-entry.ts",
                ),
                "@docyai": resolve(import.meta.dirname, "src/index.ts"),
              }
            : {
                "@docyai/style.css": resolve(
                  import.meta.dirname,
                  "lib/docyai-model/style.css",
                ),
                "@docyai/rete": resolve(
                  import.meta.dirname,
                  "lib/docyai-model/rete.js",
                ),
                "@docyai": resolve(
                  import.meta.dirname,
                  "lib/docyai-model/index.js",
                ),
              }),

        "~": resolve(import.meta.dirname, "src"),
        "@": resolve(import.meta.dirname, "src"),
      },
    },

    optimizeDeps: {
      include: [
        "ant-design-vue",
        "ant-design-vue/es/message",
        "ant-design-vue/es/locale/en_US",
        "@ant-design/icons-vue",
        "dayjs",
      ],
    },

    server: {
      host: "0.0.0.0",
      headers: {
        "Cache-Control": "no-store",
      },
      proxy: {
        "/api": {
          target: apiTarget,
          changeOrigin: true,
          secure: false,
        },
      },
    },

    preview: {
      proxy: {
        "/api": {
          target: apiTarget,
          changeOrigin: true,
          secure: false,
        },
      },
    },

    build: isLib || isReteLib
      ? {
          lib: {
            entry: resolve(
              import.meta.dirname,
              isReteLib ? "src/rete-entry.ts" : "src/index.ts",
            ),
            name: "DocYaiModel",
            fileName: isReteLib ? "rete" : "index",
            formats: ["es"],
          },

          ...(isReteLib ? { outDir: "dist-rete" } : {}),

          rolldownOptions: {
            external: externalPackages,

            output: {
              exports: "named",

              paths: {
                "@docyai/rete": "./rete.js",
                "@docyai": "./index.js",
              },

              assetFileNames: (assetInfo) => {
                if (assetInfo.names.some((name) => name.endsWith(".css"))) {
                  return isReteLib ? "style-rete.css" : "style.css";
                }

                return "assets/[name]-[hash][extname]";
              },
            },
          },

          cssMinify: false,
          sourcemap: false,
          emptyOutDir: true,
        }
      : {
          outDir: "dist-web",

          cssMinify: false,

          sourcemap: false,

          emptyOutDir: true,

          rolldownOptions: {
            treeshake: {
              moduleSideEffects: reteSideEffectFree.map((test) => ({
                test,
                sideEffects: false,
              })),
            },

            output: {
              assetFileNames: (assetInfo) => {
                if (assetInfo.names.some((name) => name.endsWith(".css"))) {
                  return "assets/style-[hash][extname]";
                }

                return "assets/[name]-[hash][extname]";
              },
            },
          },
        },
  };
});
