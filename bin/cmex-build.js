#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import minimist from 'minimist';
import { rollup } from 'rollup';
import { getRollupConfigs } from '../scripts/config/rollup.config.js'

const program = new Command();

program
  .usage('[options]')
  .option('-s --scope <scope>', 'build specific component')

program.on('--help', () => {
  console.log(chalk.yellow('# Build all the components'));
  console.log(chalk.white('# cmex build'));
  console.log(chalk.yellow('# Build specific component'));
  console.log(chalk.white('# cmex build -s <scope>'));
})

const args = minimist(process.argv.slice(2));

if (args.h || args.help) {
  program.help()
}

const scope = args.s || args.scope

const spinner = ora({
  color: 'yellow',
  text: chalk.yellow('# Building...'),
})

spinner.start()

const rollupConfigs = getRollupConfigs(scope)
rollupConfigs.map(item => {
  const { output, ...props } = item
  rollup(props).then(bundle => {
    spinner.stop()
    console.log(chalk.yellow('# Built successfully.'));
    bundle.write(output)
  }).catch(error => {
    console.log(chalk.red(error));
    process.exit(-1)
  })
})

