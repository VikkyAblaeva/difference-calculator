import yaml from 'js-yaml';

const parseData = (readFile, extension) => {
  switch (extension) {
    case 'json':
      return JSON.parse(readFile, { encoding: 'utf8', flag: 'r' });
    case 'yml':
      return yaml.load(readFile, 'utf8');
    case 'yaml':
      return yaml.load(readFile, 'utf8');
    default:
      return `Error! ${extension} is unknown extname!`;
  }
};

export default parseData;
