
// list any esmodule dependencies here. Esmodules can cause issues with Jest.
// @ts-ignore
const jestConfig = require('../jest.node.config');
module.exports = {
  ...jestConfig,
};
