module.exports = {
  root: true,

  extends: [
    'plugin:vue/strongly-recommended',
    'standard',
    '@vue/standard'
  ],

  env: {
    browser: true
  },

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
    'semi': 'off',
    'prefer-const': 'off',
    'vue/html-quotes': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
