// MainLogo.stories.js

import MainLogo from './MainLogo.vue'

export default {
  title: 'Home/Header/Logo',
  component: MainLogo,
  parameters: {
    layout: 'centered'
  }
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



