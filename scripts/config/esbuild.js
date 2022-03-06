const { resolve } = require('path')
const glob = require('glob')
const chalk = require('chalk')
const sveltePlugin = require(`esbuild-svelte`);
const peerDependencies = require('../../package.json').peerDependencies

const { PROJECT_PATH } = require('../constants.js')

const svelte = sveltePlugin({
  compilerOptions:{
    css: true
  }
});

function setPlugins() {
  return [
    svelte
  ]
}

function getEsbuildConfigs (scope) {

  const allEntry = glob.sync(`${resolve(PROJECT_PATH, './packages')}/*/lib/index.js`)
    .reduce((x, y) => Object.assign(x, {
      [y.split('/').slice(-3, -2)]: y,
    }), {});

  let entry;

  if (scope) {
    if (!Object.keys(allEntry).includes(scope)) {
      console.log(chalk.red('# No such a component.'))
      process.exit(-1)
    } else {
      entry = {
        [scope]: `${resolve(PROJECT_PATH, './packages')}/${scope}/lib/index.js`
      };
    }
  } else {
    entry = allEntry
  }

  const esbuildConfigs = [];
  for (let [key, value] of Object.entries(entry)) {
    esbuildConfigs.push({
      entryPoints: [value],
      outfile: resolve(PROJECT_PATH, `./packages/${key}/dist/index.js`),
      format: 'esm',
      bundle: true,
      minify: true,
      sourcemap: false,
      plugins: setPlugins(),
      external: [
        Object.keys(peerDependencies)
      ]
    })
  }
  return esbuildConfigs
}

module.exports = getEsbuildConfigs
