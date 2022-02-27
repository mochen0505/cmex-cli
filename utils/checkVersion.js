import * as semver from 'semver';
import chalk from 'chalk';
import got from 'got';
import boxen from 'boxen';
import { version } from '../package.json';
import {
  PROJECT_NODE_VERSION,
  NPM_VERSION_URL
} from '../scripts/constants';

export const checkNodeVersion = (requiredNodeVersion) => {
    if (!semver.satisfies(PROJECT_NODE_VERSION, requiredNodeVersion)) {
        console.log(chalk.red(`You are using Node ${PROJECT_NODE_VERSION}, but @cmexd/cli requires a Node version of ${requiredNodeVersion} or higher`));
        process.exit(-1);
    } else {
        console.log(chalk.yellow('Node environment checked...'))
    }
}

export const checkCmexVersion = () => {
    const options = {
        accept: 'application/vnd.npm.install-v1+json; q=1.0, application/json; q=0.8, */*'
    }

    return got(NPM_VERSION_URL, options);
}

export const notifier = (latest) => {
    let message = [
      'New version of @cmexd/cli detected ',
      chalk.dim(version),
      chalk.reset(' → '),
      chalk.green(latest),
      ' \nRun ',
      chalk.cyan('npm i -g @cmex/cli'),
      ' to update'
    ].join('')

    const boxenOpts = {
        padding: 1,
        margin: 1,
        align: 'center',
        borderColor: 'yellow',
        borderStyle: 'double'
    }


    message = '\n' + boxen(message, boxenOpts)

    console.log(message)
}
