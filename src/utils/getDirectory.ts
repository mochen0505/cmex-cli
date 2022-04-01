const { resolve } = require('path')
const glob = require('glob')
const chalk = require('chalk')
const { PROJECT_PATH } = require('../scripts/constants')

function getDirectory (scope: string, scopePath: string): Entry {
  const allEntry: Entry = glob.sync(`${resolve(PROJECT_PATH, './packages')}/*/${scopePath}`)
    .reduce((x: Entry, y: string) => Object.assign(x, {
      [y.split('/').slice(-3, -2)[0]]: y,
    }), {});

  let entry: Entry;

  if (scope) {
    if (!Object.keys(allEntry).includes(scope)) {
      console.log(chalk.red('# No such a component.'))
      process.exit(-1)
    } else {
      entry = {
        [scope]: `${resolve(PROJECT_PATH, './packages')}/${scope}/${scopePath}`
      };
    }
  } else {
    entry = allEntry
  }

  return entry
}

module.exports = getDirectory

export {};
