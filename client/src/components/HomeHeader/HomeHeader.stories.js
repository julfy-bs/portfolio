// HomeHeader.stories.js
import HomeHeader from '@/components/HomeHeader/HomeHeader.vue'

export default {
  title: 'Home/Header',
  component: HomeHeader,
  argType: {
    isBurgerActive: {
      name: 'Активировать бургер меню',
      type: Boolean,
      control: 'boolean'
    }
  }
}

const Template = (args) => ({
  components: { HomeHeader },
  setup() {
    return {
      args
    }
  },
  template: `
    <HomeHeader v-bind='args.isBurgerActive'></HomeHeader>
  `
})

export const Default = Template.bind({})

Default.components = {}



