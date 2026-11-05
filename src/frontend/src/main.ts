import { createApp } from "vue";
import "virtual:uno.css";
import "./assets/styles/style.scss";

import "@docyai/style.css";

import App from "./App.vue";

import { createDocYaiRouter } from "./router";
import { pinia } from "./stores";

import { setCodyAIConfig } from "./core";

import { setCodyAIConfig as setReteCodyAIConfig } from "@docyai/rete";

const codyOptions = {
  baseURL: "/api",
};

setCodyAIConfig(codyOptions);
setReteCodyAIConfig(codyOptions);

const app = createApp(App);

const router = createDocYaiRouter();

app.use(pinia);

app.use(router);

await router.isReady();

app.mount("#app");
