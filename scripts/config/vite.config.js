import { svelte } from '@sveltejs/vite-plugin-svelte'
const { resolve } = require('path')
const glob = require('glob')
const chalk = require('chalk')
const { PROJECT_PATH } = require('../constants')

function setPlugins() {
  return [
    svelte()
  ]
}

function getViteConfigs(scope) {

  const allEntry = glob.sync(`${resolve(PROJECT_PATH, './packages')}/**/index.js`)
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
        [scope]: `${resolve(PROJECT_PATH, './packages')}/${scope}/index.js`
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
            dir: resolve(PROJECT_PATH, `./packages/${key}/dist`),
            format: 'es',
            sourcemap: true
          },
        }
      }
    })
  }
  return viteConfigs
}

module.exports = getViteConfigs
