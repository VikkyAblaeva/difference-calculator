#!/usr/bin/env node

import { Command } from 'commander';
import process from 'process';
import genDiff from '../src/utils.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format <type>', 'output format (default = "stylish")')
  .arguments('<filepath1> <filepath2>')
  .parse(process.argv)
  .action((filepath1, filepath2) => {
    const formatName = program.opts().format;
    console.log(genDiff(filepath1, filepath2, formatName));
  });

program.parse();
