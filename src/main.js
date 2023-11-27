import { createApp } from 'vue'
import './style.css'
import App from './Add Detail.vue'
import { registerSW } from 'virtual:pwa-register'
import axios from 'axios'
import { createVuetify } from 'vuetify'


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
const vuetify = createVuetify();
app.use(vuetify).mount('#app')







