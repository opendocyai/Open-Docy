import pluginVue from "eslint-plugin-vue";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "dist-web/**",
      "lib/**",
      "public/**",
      "third-party/**",
      "scripts/**",
    ],
  },
  ...pluginVue.configs["flat/essential"],
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: { parser: tsParser, extraFileExtensions: [".vue"] },
    },
  },
  {
    files: ["**/*.ts"],
    languageOptions: { parser: tsParser },
  },
  {
    rules: {
      "no-unused-vars": "off",
      "vue/multi-word-component-names": "off",
      "vue/no-v-html": "off",
    },
  },
];
