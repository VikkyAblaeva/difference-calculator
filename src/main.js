import path from 'path';
import fs from 'fs';
import getFormat from './formatters/index.js';
import buildTree from './buildTree.js';
import parseData from './parser.js';

const getExtension = (filepath) => path.extname(filepath).slice(1);

const readFile = (filepath) => fs.readFileSync(path.resolve(filepath), { encoding: 'utf8', flag: 'r' });

const genDiff = (pathOfInitialFile, pathOfChangedFile, formatName = 'stylish') => {
  const tree1 = parseData(readFile(pathOfInitialFile), getExtension(pathOfInitialFile));
  const tree2 = parseData(readFile(pathOfChangedFile), getExtension(pathOfChangedFile));
  const getFormatFunction = getFormat(formatName);
  const diff = getFormatFunction(buildTree(tree1, tree2));
  return diff;
};

export default genDiff;
