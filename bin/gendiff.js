#!/usr/bin/env node

const { Command } = require('commander');
const process = require('process');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');

const getData = (filepath) => JSON.parse(fs.readFileSync(path.resolve(filepath), { encoding: 'utf8', flag: 'r' }));

const genDiff = (filepath1, filepath2) => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const values1 = Object.values(data1);
  const values2 = Object.values(data2);
  let helper = [];
  let result = '';
  for (let i = 0; i < keys1.length; i += 1) {
    if (keys2.includes(keys1[i]) && values2.includes(values1[i])) {
      helper.push({ key: keys1[i], value: values1[i], status: ' ' });
    }
    if (!keys2.includes(keys1[i])) {
      helper.push({ key: keys1[i], value: values1[i], status: '-' });
    }
    if (keys2.includes(keys1[i]) && !values2.includes(values1[i])) {
      helper.push({ key: keys1[i], value: values1[i], status: '-' });
    }
  }
  for (let i = 0; i < keys2.length; i += 1) {
    if (!keys1.includes(keys2[i])) {
      helper.push({ key: keys2[i], value: values2[i], status: '+' });
    }
    if (keys1.includes(keys2[i]) && !values1.includes(values2[i])) {
      helper.push({ key: keys2[i], value: values2[i], status: '+' });
    }
  }
  helper = _.sortBy(helper, ['key']);
  for (let i = 0; i < helper.length; i += 1) {
    result = `${result}\n  ${helper[i].status} ${helper[i].key}: ${helper[i].value}`;
  }
  return `{${result}\n}`;
};

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .parse(process.argv)
  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2));
  });

program.parse();
