import { createApp } from "vue";
import { registerSW } from "virtual:pwa-register";

import "./style.css";
import App from "./App.vue";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

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

const app = createApp(App);

const vuetify = createVuetify({
  components,
  directives,
});

app.use(vuetify).mount("#app");
