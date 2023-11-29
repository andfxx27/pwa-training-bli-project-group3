import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { registerSW } from "virtual:pwa-register";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import "@mdi/font/css/materialdesignicons.css";

// const intervalMS = 60 * 60 * 1000
const intervalMS = 60 * 60 * 10000;

const updateSW = registerSW({
  onRegistered(r) {
    r &&
      setInterval(() => {
        r.update();
      }, intervalMS);
  },
});
registerSW({ immediate: true });

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App).use(vuetify).mount("#app");
