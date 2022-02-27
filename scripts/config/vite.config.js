import { svelte } from '@sveltejs/vite-plugin-svelte'
import * as path from 'path'
// const glob = require('glob')
import glob from 'glob';
import chalk from 'chalk';
import { PROJECT_PATH } from '../constants.js'

function setPlugins() {
  return [
    svelte()
  ]
}

export const getViteConfigs = (scope) => {

  const allEntry = glob.sync(`${path.resolve(PROJECT_PATH, './packages')}/**/index.js`)
    .reduce((x, y) => Object.assign(x, {
      [y.split('/').slice(-2, -1)]: y,
    }), {});

  let entry;

  if (scope) {
    if (!Object.keys(allEntry).includes(scope)) {
      console.log(chalk.red('# No such a component.'))
      process.exit(-1)
    } else {
      entry = {
        [scope]: `${path.resolve(PROJECT_PATH, './packages')}/${scope}/index.js`
      };
    }
  } else {
    entry = allEntry
  }

  const viteConfigs = [];
  for (let [key, value] of Object.entries(entry)) {
    viteConfigs.push({
      plugins: setPlugins(),
      build: {
        rollupOptions: {
          input: value,
          output: {
            dir: path.resolve(PROJECT_PATH, `./packages/${key}/dist`),
            format: 'es',
            sourcemap: true
          },
        }
      }
    })
  }
  return viteConfigs
}
