const { resolve } = require('path')
const sveltePlugin = require(`esbuild-svelte`);
const peerDependencies = require('../../package.json').peerDependencies
const getDirectory = require('../../utils/getDirectory')
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

  const entry = getDirectory(scope, 'lib/index.js')

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
