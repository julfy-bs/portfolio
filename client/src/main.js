import { createApp } from 'vue'
import App from '@/App.vue'
import store from '@/store'
import router from '@/router'
import components from '@/components/UI'
import InlineSvg from 'vue-inline-svg'
import '@/assets/styles/main.scss'

const app = createApp(App)

components.forEach(component => {
  app.component(component.name, component)
})

app
  .component('InlineSvg', InlineSvg)
  .use(router)
  .use(store)
  .mount('#app')