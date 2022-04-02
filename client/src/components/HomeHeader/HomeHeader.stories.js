// HomeHeader.stories.js
import HomeHeader from '@/components/HomeHeader/HomeHeader.vue'

export default {
  title: 'Home/Header',
  component: HomeHeader,

}

const Template = () => ({
  components: { HomeHeader },
  template: `
    <HomeHeader></HomeHeader>
  `
})

export const Default = Template.bind({})

Default.components = {
}



