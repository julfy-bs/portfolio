import { createApp } from 'vue'
import App from '@/App.vue'
import InlineSvg from 'vue-inline-svg'
import store from '@/store/index.ts'
import router from '@/router/index.ts'
import components from '@/components/UI/index.ts'
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
