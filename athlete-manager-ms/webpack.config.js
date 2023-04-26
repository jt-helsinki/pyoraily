/* eslint-disable @typescript-eslint/no-var-requires */
const nodeExternals = require('webpack-node-externals');
const slsw = require('serverless-webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { IgnorePlugin } = require('webpack');

const lazyImports = ['@nestjs/microservices/microservices-module', '@nestjs/websockets/socket-module'];

module.exports = {
  // entry: set by the plugin
  // output: set by the plugin
  cache: {
    type: 'filesystem',
  },
  target: 'node',
  entry: slsw.lib.entries,
  externals: [
    /aws-sdk/, // Available on AWS Lambda,
    nodeExternals(),
  ],
  mode: 'development',
  /**
   * Attempt to resolve these extensions in order. If multiple files share the same name
   * but have different extensions, webpack will resolve the one with the extension listed
   * first in the array and skip the rest.
   */
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
        test: /\.(ts|js)x?$/,
        use: 'ts-loader',
        exclude: /(node_modules)|(test)/,
      },
    ],
  },
};
