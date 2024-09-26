import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
axios.defaults.baseURL = 'http://127.0.0.1:8000';
import store from './store/index.js';
import './assets/tailwind.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEdit, faTrash, faCheck, faClose } from '@fortawesome/free-solid-svg-icons';
library.add(faEdit, faTrash, faCheck, faClose);



const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.use(store)

app.mount('#app')
