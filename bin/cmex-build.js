#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import minimist from 'minimist';
import { defineConfig } from 'vite'
import { getViteConfigs } from '../scripts/config/vite.config.js'

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

const viteConfigs = getViteConfigs(scope)
viteConfigs.map(item => {
  defineConfig(item)
})

