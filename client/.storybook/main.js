const path = require('path')

module.exports = {
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-scss'
  ],
  framework: '@storybook/vue3',
  webpackFinal: async (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, '../src/')
    return config
  },
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule.use('vue-svg-loader').loader('vue-svg-loader')
  },
  typescript: {
    check: false,
    checkOptions: {}
  }
}
