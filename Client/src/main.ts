import 'bulma/css/bulma.css'
import '@fortawesome/fontawesome-free/css/all.css'
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import SimpleTypeahead from 'vue3-simple-typeahead'

const app = createApp(App)

app.use(router)
app.use(SimpleTypeahead)
app.mount('#app')
