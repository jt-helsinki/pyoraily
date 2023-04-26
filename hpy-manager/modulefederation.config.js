const { dependencies } = require('./package.json');

module.exports = {
  name: 'HPY_MANAGER',
  filename: 'remoteEntry.js',
  exposes: {
    './hpyManagerApp': './src/App',
  },
  shared: {
    ...dependencies,
    '@tanstack/react-query': {
      singleton: true,
      requiredVersion: false,
    },
    'axios': {
      singleton: true,
      requiredVersion: false,
    },
    'react-router-dom': {
      singleton: true,
      requiredVersion: false,
    },
    'react-dom': {
      singleton: true,
      requiredVersion: false,
    },
    react: {
      singleton: true,
      requiredVersion: false,
    },
    'semantic-ui-react': {
      singleton: true,
      requiredVersion: false,
    },
    'semantic-ui-css': {
      singleton: true,
      requiredVersion: false,
    },
  },
};
