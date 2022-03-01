#!/usr/bin/env node

import { Command } from 'commander';
import * as path from 'path'
import chalk from 'chalk';
import minimist from 'minimist';
import shell from 'shelljs'
import figlet from 'figlet';
import gradient from 'gradient-string'
import { PROJECT_PATH } from "../scripts/constants.js";

const program = new Command();

program
  .usage('[options]')
  .option('-s --scope <scope>', 'test specific component')

program.on('--help', () => {
  console.log(chalk.yellow('# Test all the components'));
  console.log(chalk.white('# cmex test'));
  console.log(chalk.yellow('# Test specific component'));
  console.log(chalk.white('# cmex test -s <scope>'));
})

const args = minimist(process.argv.slice(2));

if (args.h || args.help) {
  program.help()
}

const scope = args.s || args.scope

const dir = `${path.resolve(PROJECT_PATH, './packages')}/${scope}/__tests__/index.test.js`

shell.exec(`jest ${dir}`, () => {
  const msg = 'Congrats!'
  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data))
  })
})



