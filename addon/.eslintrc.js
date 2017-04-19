module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended'
  ],
  env: {
    browser: true
  },
  rules: {
    "indent":           ["error", 2],
    "linebreak-style":  ["error", "unix"],
    "semi":             ["error", "always"],
  }
};
