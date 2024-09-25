import { createApp } from 'vue'

import router from './router/index.js'

import App from './App.vue'

// createApp(App).mount('#app')
const app = createApp(App);
app.use(router);
app.mount('#app');
