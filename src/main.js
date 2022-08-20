import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import yaml from 'js-yaml';
import getFormat from './formatters/index.js';

const getObjectWithData = (filepath) => {
  const extension = filepath.toString().slice(-4);
  switch (extension) {
    case 'json':
      return JSON.parse(fs.readFileSync(path.resolve(filepath), { encoding: 'utf8', flag: 'r' }));
    case '.yml':
      return yaml.load(fs.readFileSync(path.resolve(filepath), 'utf8'));
    case 'yaml':
      return yaml.load(fs.readFileSync(path.resolve(filepath), 'utf8'));
    default:
      return 'Error! Unknown format!';
  }
};

const buildTree = (tree1, tree2) => {
  const iter = (obj1, obj2) => {
    const obj1Keys = Object.keys(obj1);
    const obj2keys = Object.keys(obj2);
    const objectsKeys = _.sortBy(_.union(obj1Keys, obj2keys));
    const diffResult = objectsKeys.map((key) => {
      if (!_.has(obj1, key)) {
        return { key, value: obj2[key], status: 'added' };
      }
      if (!_.has(obj2, key)) {
        return { key, value: obj1[key], status: 'removed' };
      }
      if (obj1[key] === obj2[key]) {
        return { key, value: obj1[key], status: 'unchanged' };
      }
      if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
        return { key, value: iter(obj1[key], obj2[key]), status: 'nested' };
      }
      return { key, value: { oldValue: obj1[key], newValue: obj2[key] }, status: 'updated' };
    });
    return diffResult;
  };
  return iter(tree1, tree2);
};

const genDiff = (pathOfInitialFile, pathOfChangedFile, formatName) => {
  const tree1 = getObjectWithData(pathOfInitialFile);
  const tree2 = getObjectWithData(pathOfChangedFile);
  const functionFormat = getFormat(formatName);
  const diff = functionFormat(buildTree(tree1, tree2));
  return diff;
};

export { getObjectWithData, buildTree };
export default genDiff;
