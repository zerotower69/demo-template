module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:nuxt/recommended', 'plugin:vue/vue3-essential'],
  // "overrides": [
  //   {
  //     "env": {
  //       "node": true
  //     },
  //     "files": [".eslintrc.{js,cjs}"],
  //     "parserOptions": {
  //       "sourceType": "script"
  //     }
  //   }
  // ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint'],
  rules: {
    indent: ['error', 'tab'],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'double'],
    semi: ['error', 'always'],
    //nuxt中提倡vue文件和组件使用kebab-case（烤肉串式）风格命名，将该规则设为0关闭校验
    'vue/multi-word-component-names': 0,
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/max-attributes-per-line': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'vue/valid-template-root': 'off'
  }
}
