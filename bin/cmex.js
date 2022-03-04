#!/usr/bin/env node

import { Command } from 'commander'

const program = new Command();

function programConfig() {
  program
    .version('1.8.0')
    .usage('<cmd> [options]')
    .command('sb', 'Run storybook')
    .command('build', 'Build your library')
    .command('test', 'Test your library')
    .parse(process.argv)
}

programConfig();
