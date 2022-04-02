// MainLogo.stories.js

import MainLogo from './MainLogo.vue'

export default {
  title: 'Home/Header/Logo',
  component: MainLogo,
  // decorators: [() => ({ template: '<div style="margin: 1rem 50%; transform: translateX(-50%)"><story/></div>' })]
}

const Template = (args) => ({
  components: { MainLogo },
  setup() {
    return {
      args
    }
  },
  template: '<MainLogo v-bind="args" />'
})

export const Default = Template.bind({})



