import '../src/assets/styles/main.scss'
import App from '@/App.vue'

const customViewports = {
  macBook: {
    name: 'MacBook Air (M1, 2020)',
    styles: {
      width: '1440px',
      height: '900px'
    }
  },
  iPhone11: {
    name: 'iPhone 11',
    styles: {
      width: '414px',
      height: '896px'
    }
  }
}

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  layout: 'fullscreen',
  viewport: { viewports: customViewports }
}


export const decorators = [(story) => ({
  components: { App, story },
  template: '<story/>'
})]


