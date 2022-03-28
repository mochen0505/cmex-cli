const semver = require('semver')
const chalk = require('chalk')
const got = require('got')
const boxen = require('boxen')
const packageVersion = require('../package.json').version;
const {
  PROJECT_NODE_VERSION,
  NPM_VERSION_URL
} = require('../scripts/constants.js');

function checkNodeVersion (requiredNodeVersion) {
    if (!semver.satisfies(PROJECT_NODE_VERSION, requiredNodeVersion)) {
        console.log(chalk.red(`You are using Node ${PROJECT_NODE_VERSION}, but @cmex/cli requires a Node version of ${requiredNodeVersion} or higher`));
        process.exit(-1);
    } else {
        console.log(chalk.yellow('Node environment checked...'))
    }
}

function checkCmexVersion () {
    const options = {
        accept: 'application/vnd.npm.install-v1+json; q=1.0, application/json; q=0.8, */*'
    }

    return got(NPM_VERSION_URL, options);
}

function notifier (latest) {
    let message = [
      'New version of @cmex/cli detected ',
      chalk.dim(packageVersion),
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

module.exports = {
  checkNodeVersion,
  checkCmexVersion,
  notifier,
}
