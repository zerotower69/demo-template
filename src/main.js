import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

//use unocss
import 'virtual:uno.css';

const app = createApp(App);
app.mount('#app');
