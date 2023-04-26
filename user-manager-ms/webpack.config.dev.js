/* eslint-disable @typescript-eslint/no-var-requires */
const slsw = require('serverless-webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { IgnorePlugin } = require('webpack');
const path = require('path');

const lazyImports = [
  '@nestjs/microservices',
  '@nestjs/microservices/microservices-module',
  '@nestjs/websockets/socket-module',
  'cache-manager',
  'class-validator',
  'class-transformer',
];

module.exports = {
  // entry: set by the plugin
  // output: set by the plugin
  cache: {
    type: 'filesystem',
  },
  target: 'node',
  entry: slsw.lib.entries,
  externals: [
    'aws-sdk', // Available on AWS Lambda,
  ],
  mode: 'development',
  resolve: {
    symlinks: true,
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.build.json' })],
  },
  plugins: [
    new IgnorePlugin({
      checkResource(resource) {
        if (lazyImports.includes(resource)) {
          try {
            require.resolve(resource);
          } catch (err) {
            return true;
          }
        }
        return false;
      },
    }),
  ],
  module: {
    rules: [
      {
        // Include ts, tsx, js, and jsx files.
        test: /\.ts(x)?$/,
        use: 'ts-loader',
        exclude: /(node_modules)|(test)/,
      },
    ],
  },
};
