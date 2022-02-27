import * as path from 'path';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export const CMEX_PATH = path.resolve(__dirname, '../');
export const PROJECT_PATH = process.cwd();
export const PROJECT_NODE_VERSION = process.version;
export const SERVER_HOST = '127.0.0.1';
export const SERVER_PORT = 8888;
export const NPM_VERSION_URL = 'https://registry.npmjs.org/@cmexd/cli/latest';

export const GITHUB = {
  host: 'github.com/mochen0505'
}
