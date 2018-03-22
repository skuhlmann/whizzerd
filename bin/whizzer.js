#!/usr/bin/env node

const nodeVersion = Number(process.version.match(/^v(\d+\.\d+)/)[1]);

if (nodeVersion < 8) {
  console.log(
    `*** whizzer requires Node.js version >= 8. Please upgrade. ***`
  );

  process.exit(1);
}

require('commander')
  .version(require('../package').version)
  .usage('<command> [options]')
  .command('new [componentName]', 'generate a new component')
  .parse(process.argv);