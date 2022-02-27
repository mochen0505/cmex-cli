#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const { SERVER_PORT } = require('../scripts/constants')
const { exec } = require('shelljs')

program
  .usage('[options]')
  .option('-p --port <port>', 'set storybook server port')

program.on('--help', () => {
  console.log(chalk.yellow('# run storybook with default port'));
  console.log(chalk.white('# cmex dev'));
  console.log(chalk.yellow('# run storybook with custom port'));
  console.log(chalk.white('# cmex dev -p <port>'));
})

const args = require('minimist')(process.argv.slice(2));

if (args.h || args.help) {
  program.help()
}

const port = args.p || args.port || SERVER_PORT;

exec(`start-storybook -p ${port}`)
