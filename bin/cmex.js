#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { version } from '../package.json';
import { engines } from '../package.json';
import {
  checkNodeVersion,
  checkCmexVersion,
  notifier
} from '../utils/checkVersion';

const program = new Command();

function programConfig() {
  program
    .version(version)
    .usage('<cmd> [options]')
    .command('sb', 'Run storybook')
    .command('build', 'Build your library')
    .parse(process.argv)
}

programConfig();

checkNodeVersion(engines.node);
checkCmexVersion().then(res => {
  const data = JSON.parse(res.body);
  const latest = data.version;
  notifier(latest);
  programConfig();
}).catch(err => {
  console.log(chalk.red(err));
  process.exit(-1);
});
