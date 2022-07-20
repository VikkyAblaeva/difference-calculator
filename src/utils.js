import path from 'path';
import fs from 'fs';
import _ from 'lodash';

const getData = (filepath) => JSON.parse(fs.readFileSync(path.resolve(filepath), { encoding: 'utf8', flag: 'r' }));

const getStringGenDiff = (arrayForString) => {
  let stringGenDiff = '';
  for (let i = 0; i < arrayForString.length; i += 1) {
    stringGenDiff = `${stringGenDiff}\n  ${arrayForString[i].status} ${arrayForString[i].key}: ${arrayForString[i].value}`;
  }
  return `{${stringGenDiff}\n}`;
};

const genDiff = (filepath1, filepath2) => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const values1 = Object.values(data1);
  const values2 = Object.values(data2);
  let helper = [];
  for (let i = 0; i < keys1.length; i += 1) {
    if (keys2.includes(keys1[i]) && values2.includes(values1[i])) {
      helper.push({ key: keys1[i], value: values1[i], status: ' ' });
    }
    if (!keys2.includes(keys1[i]) || (keys2.includes(keys1[i]) && !values2.includes(values1[i]))) {
      helper.push({ key: keys1[i], value: values1[i], status: '-' });
    }
  }
  for (let i = 0; i < keys2.length; i += 1) {
    if (!keys1.includes(keys2[i]) || (keys1.includes(keys2[i]) && !values1.includes(values2[i]))) {
      helper.push({ key: keys2[i], value: values2[i], status: '+' });
    }
  }
  helper = _.sortBy(helper, ['key']);
  const stringGenDiff = getStringGenDiff(helper);
  return stringGenDiff;
};

export { getData, genDiff };
