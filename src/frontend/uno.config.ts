import {
  defineConfig,
  presetAttributify,
  presetTagify,
  presetWind4,
  presetWebFonts,
  transformerAttributifyJsx,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

export default defineConfig({
  content: {
    pipeline: {
      exclude: [/node_modules/],
    },
  },
  shortcuts: [],
  theme: {},
  presets: [
    presetWind4({}),
    presetAttributify({}),
    presetTagify({}),
    presetWebFonts({}),
  ],
  transformers: [
    transformerAttributifyJsx({}),
    transformerDirectives({}),
    transformerVariantGroup({}),
  ],
});
