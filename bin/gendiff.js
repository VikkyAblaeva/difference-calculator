#!/usr/bin/env node

const { Command } = require('commander');

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('output the version number')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>');

program.parse();
