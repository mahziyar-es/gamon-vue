import { createApp } from 'vue'
import Demo from './Demo.vue'
import gamonVue from '../plugin/index'


const app = createApp(Demo)
app.use(gamonVue)
app.mount('#app')