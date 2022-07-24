import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import yaml from 'js-yaml';

const getObjectWithData = (filepath) => {
  let objectWithData = {};
  if (filepath.slice(-2) === 'on') {
    objectWithData = JSON.parse(fs.readFileSync(path.resolve(filepath), { encoding: 'utf8', flag: 'r' }));
  }
  if (filepath.slice(-2) === 'ml') {
    objectWithData = yaml.load(fs.readFileSync(path.resolve(filepath), 'utf8'));
  }
  return objectWithData;
};

const getDifferencesToString = (differences) => {
  let differencesToString = '';
  for (let i = 0; i < differences.length; i += 1) {
    differencesToString = `${differencesToString}\n  ${differences[i].status} ${differences[i].key}: ${differences[i].value}`;
  }
  return `{${differencesToString}\n}`;
};

const getKeys = (filepath) => {
  const keys = Object.keys(getObjectWithData(filepath));
  return keys;
};

const getValues = (filepath) => {
  const values = Object.values(getObjectWithData(filepath));
  return values;
};

const genDiff = (pathOfInitialFile, pathOfChangedFile) => {
  const keysOfInitialFile = getKeys(pathOfInitialFile);
  const keysOfChangedFile = getKeys(pathOfChangedFile);
  const valuesOfInitialFile = getValues(pathOfInitialFile);
  const valuesOfChsngedFile = getValues(pathOfChangedFile);
  let differences = [];
  for (let i = 0; i < keysOfInitialFile.length; i += 1) {
    if (keysOfChangedFile.includes(keysOfInitialFile[i])
      && valuesOfChsngedFile.includes(valuesOfInitialFile[i])) {
      differences.push({ key: keysOfInitialFile[i], value: valuesOfInitialFile[i], status: ' ' });
    }
    if (!keysOfChangedFile.includes(keysOfInitialFile[i])
      || (keysOfChangedFile.includes(keysOfInitialFile[i])
      && !valuesOfChsngedFile.includes(valuesOfInitialFile[i]))) {
      differences.push({ key: keysOfInitialFile[i], value: valuesOfInitialFile[i], status: '-' });
    }
  }
  for (let i = 0; i < keysOfChangedFile.length; i += 1) {
    if (!keysOfInitialFile.includes(keysOfChangedFile[i])
      || (keysOfInitialFile.includes(keysOfChangedFile[i])
      && !valuesOfInitialFile.includes(valuesOfChsngedFile[i]))) {
      differences.push({ key: keysOfChangedFile[i], value: valuesOfChsngedFile[i], status: '+' });
    }
  }
  differences = _.sortBy(differences, ['key']);
  const differencesToString = getDifferencesToString(differences);
  return differencesToString;
};

export { getObjectWithData, genDiff };
