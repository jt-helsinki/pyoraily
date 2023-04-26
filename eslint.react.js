

const config = require('./eslint.node');

module.exports = {
  ...config,
  extends: [
    'eslint:recommended',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    // leave this off for now until we have types that can be shared between MFEs
    //'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'airbnb-typescript',
    'react-app/jest',
    'prettier',
  ],
  env: {
    ...config.env,
    browser: true,
    es2022: true,
    node: false,
  },
  rules: {
    ...config.rules,
    'no-return-assign': 'off',
    'jsx-a11y/label-has-associated-control': 'warn',
    'react/no-array-index-key': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'react/jsx-uses-react': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'react/no-unused-prop-types': 'warn',
    'react/react-in-jsx-scope': 'off',
    'react/destructuring-assignment': 'off',
    'react/jsx-boolean-value': 'off',
    'react/jsx-no-bind': 'off',
    "react/function-component-definition": [
      2,
      {
        "namedComponents": "arrow-function",
        "unnamedComponents": "arrow-function"
      }
    ],
  },
};
