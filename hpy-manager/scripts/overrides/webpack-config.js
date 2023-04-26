
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
const fs = require('fs');
const webpackConfigPath = 'react-scripts/config/webpack.config';
const webpackConfig = require(webpackConfigPath);
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const {NODE_ENV} = process.env;
if (!NODE_ENV) {
  throw new Error(
      'The NODE_ENV environment variable is required but was not specified.'
  );
}

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
const envFile = resolveApp('envs/env');

const envFiles = [
  // Don't include `.env.local` for `test` environment
  // since normally you expect tests to produce the same
  // results for everyone
  NODE_ENV === 'production' ? `${envFile}.production.yaml` : `${envFile}.development.yaml`,
].filter(Boolean);

// Load environment variables from .env* files. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.  Variable expansion is supported in .env files.
// https://github.com/motdotla/dotenv
// https://github.com/motdotla/dotenv-expand
envFiles.forEach((yamlEnvFile) => {
  if (fs.existsSync(yamlEnvFile)) {
    require('dotenv-expand')(
        require('dotenv-yaml').config({path: yamlEnvFile})
    );
  }
});

const override = (config) => {
  config.resolve.plugins.push(new TsconfigPathsPlugin());
  config.plugins.push(
      new ModuleFederationPlugin(require('../../modulefederation.config.js'))
  );
  config.output.publicPath = process.env.HPY_MANAGER_S3_BUCKET_URL || 'http://localhost:3004/';
  config.resolve.symlinks = true;

  return config;
};

require.cache[require.resolve(webpackConfigPath)].exports = (env) =>
    override(webpackConfig(env));

module.exports = require(webpackConfigPath);
