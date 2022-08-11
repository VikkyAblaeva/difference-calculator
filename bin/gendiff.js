#!/usr/bin/env node

import { Command } from 'commander';
import process from 'process';
import { genDiff } from '../src/utils.js';
import getStylish from '../src/stylish/stylish.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format <type>', 'output format (default = "stylish")')
  .arguments('<filepath1> <filepath2>')
  .parse(process.argv)
  .action((filepath1, filepath2) => {
    console.log(getStylish(genDiff(filepath1, filepath2)));
  });

program.parse();
