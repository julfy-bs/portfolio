module.exports = {
  root: true,

  env: {
    node: true
  },

  parserOptions: {
    parser: '@typescript-eslint/parser'
  },

  'extends': [
    // 'airbnb-base',
    // '@vue/airbnb',
    'plugin:vue/vue3-recommended',
    // '@vue/typescript',
    'prettier'
  ],

  plugins: ['prettier'],

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'class-methods-use-this': 'off',
    'import/extensions': 'off',
    'consistent-return': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-expressions': 'off',
    'no-param-reassign': [2, { 'props': false }]
  },

  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ],

  settings: {
    'import/resolver': {
      'node': {
        'extensions': ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  }
}
