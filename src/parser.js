import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

const parseData = (filepath) => {
  const extension = path.extname(filepath).slice(1);
  switch (extension) {
    case 'json':
      return JSON.parse(fs.readFileSync(path.resolve(filepath), { encoding: 'utf8', flag: 'r' }));
    case 'yml':
      return yaml.load(fs.readFileSync(path.resolve(filepath), 'utf8'));
    case 'yaml':
      return yaml.load(fs.readFileSync(path.resolve(filepath), 'utf8'));
    default:
      return `Error! ${extension} is unknown extname!`;
  }
};

export default parseData;
