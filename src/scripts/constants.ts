const { resolve } = require('path')

const CMEX_PATH: string = resolve(__dirname, '../');
const PROJECT_PATH: string = process.cwd();
const PROJECT_NODE_VERSION: string = process.version;
const SERVER_HOST: string = '127.0.0.1';
const SERVER_PORT: number = 8888;
const NPM_VERSION_URL: string = 'https://registry.npmjs.org/@cmex/cli/latest';

module.exports = {
  CMEX_PATH,
  PROJECT_PATH,
  PROJECT_NODE_VERSION,
  SERVER_HOST,
  SERVER_PORT,
  NPM_VERSION_URL,
}

export {};
