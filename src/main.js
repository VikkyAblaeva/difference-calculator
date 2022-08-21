import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import getFormat from './formatters/index.js';
import buildTree from './buildTree.js';

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

const genDiff = (pathOfInitialFile, pathOfChangedFile, formatName) => {
  const tree1 = getObjectWithData(pathOfInitialFile);
  const tree2 = getObjectWithData(pathOfChangedFile);
  const functionFormat = getFormat(formatName);
  const diff = functionFormat(buildTree(tree1, tree2));
  return diff;
};

export { getObjectWithData };
export default genDiff;
