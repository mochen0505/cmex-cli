#!/usr/bin/env node

const program = require('commander')
const { resolve } = require('path')
const chalk = require('chalk')
const { exec } = require('shelljs')
const figlet = require('figlet')
const gradient = require('gradient-string')
const { PROJECT_PATH } = require('../scripts/constants.js')

program
  .usage('[options]')
  .option('-s --scope <scope>', 'test specific component')

program.on('--help', () => {
  console.log(chalk.yellow('# Test all the components'));
  console.log(chalk.white('# cmex test'));
  console.log(chalk.yellow('# Test specific component'));
  console.log(chalk.white('# cmex test -s <scope>'));
})

const args = require('minimist')(process.argv.slice(2))

if (args.h || args.help) {
  program.help()
}

const scope = args.s || args.scope

const dir = `${resolve(PROJECT_PATH, './packages')}/${scope}/__tests__/index.test.js`

exec(`jest ${dir}`, () => {
  const msg = 'Congrats!'
  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data))
  })
})



