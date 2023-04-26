
// list any esmodule dependencies here. Esmodules can cause issues with Jest.
const jestConfig = require('../jest.react.config');
const esModules = [].join('|');
module.exports = {
  ...jestConfig,
  transformIgnorePatterns: esModules.length ?
    [`[/\\\\]node_modules[/\\\\](?!${esModules})`, ...jestConfig.transformIgnorePatterns]
    : [...jestConfig.transformIgnorePatterns]
};

