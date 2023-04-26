

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier', 'header', 'import'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [
    'build/**/*',
    'config/**/*',
    'scripts/**/*',
    'node_modules/**/*',
    '**/*.json',
    '**/*.js',
    '**/*.d.ts',
    '**/*.spec.js',
    '**/*.spec.ts',
    '**/*.spec.d.ts',
    '**/*.spec.tsx'
  ],
  rules: {
    'prettier/prettier': 'warn',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': [
      'warn',
      {
        allowExpressions: true
      }
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-invalid-this': 'error',
    '@typescript-eslint/no-redeclare': 'warn',
    '@typescript-eslint/no-duplicate-imports': 'error',
    '@typescript-eslint/no-dupe-class-members': 'error',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      { accessibility: 'no-public' },
    ],
    'no-param-reassign': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    'import/prefer-default-export': "off",
    'import/no-extraneous-dependencies': "warn",
    'class-methods-use-this': 'off', // not required for TS
    "header/header": [2, "block", [
      "",
      " *",
      " * MIT License.",
      " *",
      " "
    ]
    ]
  },
};
