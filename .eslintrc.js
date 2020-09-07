module.exports = {
  root: true,

  env: {
    browser: true,
    node: true
  },

  extends: [
    'plugin:vue/strongly-recommended',
    'standard'
  ],

  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module'
  },

  plugins: [
    // https://eslint.vuejs.org/user-guide/#why-doesn-t-it-work-on-vue-file
    // required to lint *.vue files
    'vue'
  ],

  rules: {
    'generator-star-spacing': 'off',
    'arrow-parens': 'off',
    semi: 'off',
    'prefer-const': 'off',
    'vue/html-quotes': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  },

  extends: [
    'plugin:vue/strongly-recommended',
    'standard',
    'plugin:vue/essential',
    '@vue/standard'
  ]
}
