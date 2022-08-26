import yaml from 'js-yaml';

const parseData = (data, extension) => {
  switch (extension) {
    case 'json':
      return JSON.parse(data, { encoding: 'utf8', flag: 'r' });
    case 'yml':
    case 'yaml':
      return yaml.load(data, 'utf8');
    default:
      return `Error! ${extension} is unknown extname!`;
  }
};

export default parseData;
