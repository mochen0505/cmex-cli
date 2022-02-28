#!/usr/bin/env node

import { Command } from 'commander'
import chalk from 'chalk'
import minimist from 'minimist';
import { SERVER_PORT } from '../scripts/constants.js'
import shell from 'shelljs'

const program = new Command();

program
  .usage('[options]')
  .option('-p --port <port>', 'set storybook server port')

program.on('--help', () => {
  console.log(chalk.yellow('# run storybook with default port'));
  console.log(chalk.white('# cmex sb'));
  console.log(chalk.yellow('# run storybook with custom port'));
  console.log(chalk.white('# cmex sb -p <port>'));
})

const args = minimist(process.argv.slice(2));

if (args.h || args.help) {
  program.help()
}

const port = args.p || args.port || SERVER_PORT;

shell.exec(`start-storybook -p ${port}`)
