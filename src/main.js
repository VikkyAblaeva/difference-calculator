import getFormat from './formatters/index.js';
import buildTree from './buildTree.js';
import parseData from './parser.js';

const genDiff = (pathOfInitialFile, pathOfChangedFile, formatName = 'getStylish') => {
  const tree1 = parseData(pathOfInitialFile);
  const tree2 = parseData(pathOfChangedFile);
  const functionFormat = getFormat(formatName);
  const diff = functionFormat(buildTree(tree1, tree2));
  return diff;
};

export default genDiff;
