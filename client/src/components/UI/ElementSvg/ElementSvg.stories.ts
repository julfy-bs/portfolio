// // ElementSvg.stories.js
// import ElementSvg from './ElementSvg.vue'
//
// export default {
//   title: 'UI/SvgLoader',
//   component: ElementSvg,
//   argTypes: {
//     fileName: {
//       name: 'Название свг',
//       control: 'select',
//       defaultValue: 'github',
//       options: [
//         'arrow', 'arrow-left', 'arrow-right', 'burger',
//         'code', 'codepen', 'darkmode', 'detail', 'discord',
//         'edit', 'github', 'heart', 'language', 'language',
//         'lightmode', 'link', 'linkedin', 'location', 'password',
//         'play', 'arrow', 'plus', 'search', 'telegram', 'tick',
//         'trash', 'twitter', 'user', 'web'
//       ]
//     },
//     currentFill: {
//       name: 'Выберите цвет',
//       control: 'color'
//     },
//     currentWidth: {
//       name: 'Установите ширину',
//       control: 'number'
//     },
//     currentHeight: {
//       name: 'Установите высоту',
//       control: 'number'
//     }
//   }
// }
//
// const Template = (args) => ({
//   components: { ElementSvg },
//   setup() {
//     return {
//       args
//     }
//   },
//   template:
//     '<element-svg v-bind="args" :file-name="args.fileName" :current-fill="args.currentFill" :current-height="args.currentHeight"  :current-width="args.currentWidth"/>'
// })
//
// export const Default = Template.bind({})
//
//
