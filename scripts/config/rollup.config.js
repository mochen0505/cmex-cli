import * as path from 'path'
import glob from 'glob'
import chalk from 'chalk'
import svelte from 'rollup-plugin-svelte'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { terser } from "rollup-plugin-terser"
import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import image from '@rollup/plugin-image'
import postcss from 'rollup-plugin-postcss'
import filesize from 'rollup-plugin-filesize'
import { CMEX_PATH, PROJECT_PATH } from '../constants.js'

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
        path.resolve(PROJECT_PATH, './packages'),
      ],
      babelHelpers: 'runtime'
    }),
    // commonjs(),
    terser(),
    filesize()
  ]
}

export const getRollupConfigs = (scope) => {

  const allEntry = glob.sync(`${path.resolve(PROJECT_PATH, './packages')}/*/index.js`)
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

  const rollupConfigs = [];
  for (let [key, value] of Object.entries(entry)) {
    rollupConfigs.push({
      input: value,
      output: {
        dir: path.resolve(PROJECT_PATH, `./packages/${key}/dist`),
        format: 'es',
        sourcemap: true
      },
      plugins: setPlugins()
    })
  }
  return rollupConfigs
}
