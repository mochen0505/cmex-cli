const { resolve } = require('path')
const glob = require('glob')
const chalk = require('chalk')
const svelte = require('rollup-plugin-svelte')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const { terser } = require('rollup-plugin-terser')
const { babel } = require('@rollup/plugin-babel')
const commonjs = require('@rollup/plugin-commonjs')
const json = require('@rollup/plugin-json')
const image = require('@rollup/plugin-image')
const postcss = require('rollup-plugin-postcss')
const filesize = require('rollup-plugin-filesize')
const { CMEX_PATH, PROJECT_PATH } = require('../constants.js')

function setPlugins() {
  return [
    svelte(),
    nodeResolve(),
    json(),
    image(),
    postcss(),
    babel({
      babelrc: false,
      presets: [
        [
          `${CMEX_PATH}/node_modules/@babel/preset-env`,
          {
            modules: false,
          },
        ]
      ],
      plugins: [
        [
          `${CMEX_PATH}/node_modules/@babel/plugin-transform-runtime`,
          {
            corejs: {
              version: 3,
              proposals: true,
            },
            useESModules: true,
          },
        ],
      ],
      include: [
        resolve(PROJECT_PATH, './packages'),
      ],
      babelHelpers: 'runtime'
    }),
    commonjs(),
    terser(),
    filesize()
  ]
}

function getRollupConfigs (scope) {

  const allEntry = glob.sync(`${resolve(PROJECT_PATH, './packages')}/*/index.js`)
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

  const rollupConfigs = [];
  for (let [key, value] of Object.entries(entry)) {
    rollupConfigs.push({
      input: value,
      output: {
        dir: resolve(PROJECT_PATH, `./packages/${key}/dist`),
        format: 'es',
        sourcemap: true
      },
      plugins: setPlugins()
    })
  }
  return rollupConfigs
}

module.exports = getRollupConfigs
