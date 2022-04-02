// HomeNavigation.stories.js
import HomeNavigation from './HomeNavigation.vue'

export default {
  title: 'Home/Header/Navbar',
  component: HomeNavigation,
  parameters: {
    layout: 'centered'
  }
}

const Template = (args) => ({
  components: { HomeNavigation },
  setup() {
    return {
      args
    }
  },
  template: '<home-navigation style="display: flex; text-decoration: none" v-bind="args" />'
})

export const Default = Template.bind({})



