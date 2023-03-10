const path = require('path')
module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  // stories: ['../src/**/*.stories.tsx', '../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/preset-create-react-app',
  ],
  framework: '@storybook/react',
  webpackFinal: async (config) => {
    config.resolve.modules.push(path.resolve(__dirname, '../'))
    return config
  },
  // core: {
  //   builder: 'webpack5',
  // },
  core: {
    builder: '@storybook/builder-webpack5',
  },
  babel: async (options) => ({
    ...options,
    plugins: [['@babel/plugin-proposal-class-properties', { loose: true }]],
  }),
}
