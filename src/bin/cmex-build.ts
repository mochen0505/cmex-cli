#!/usr/bin/env node

const program = require('commander')
const chalk = require('chalk')
const ora = require('ora')
const { build } = require(`esbuild`);
const getEsbuildConfigs = require('../scripts/config/esbuild.js')

program
  .usage('[options]')
  .option('-s --scope <scope>', 'build specific component')

program.on('--help', () => {
  console.log(chalk.yellow('# Build all the components'));
  console.log(chalk.white('# cmex build'));
  console.log(chalk.yellow('# Build specific component'));
  console.log(chalk.white('# cmex build -s <scope>'));
})

const args = require('minimist')(process.argv.slice(2))

if (args.h || args.help) {
  program.help()
}

const scope = args.s || args.scope

const spinner = ora({
  color: 'yellow',
  text: chalk.yellow('# Building...'),
})

spinner.start()

const esbuildConfigs = getEsbuildConfigs(scope)
esbuildConfigs.map((item: any) => {
  build(item).then(() => {
    spinner.stop()
    console.log(chalk.yellow('# Built successfully.'));
  }).catch((err: Error) => {
    console.log(chalk.red(err));
    process.exit(-1)
  })
})

export {};

