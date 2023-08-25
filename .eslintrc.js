module.exports = {
  extends: 'next',
  settings: {
    next: {
      rootDir: 'apps/next/'
    }
  },
  plugins: ['@tanstack/query'],
  env: {
    es6: true // enables es6 features
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'react/display-name': 'off',
    '@tanstack/query/exhaustive-deps': 'error',
    '@tanstack/query/prefer-query-object-syntax': 'error',
    'no-unused-vars': [1, { args: 'after-used', argsIgnorePattern: '^_' }]
  },
  root: true
};
