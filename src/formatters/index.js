import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJsonString from './json.js';

const getFormat = (formatName) => {
  switch (formatName) {
    case 'plain':
      return formatPlain;
    case 'json':
      return formatJsonString;
    case 'stylish':
      return formatStylish;
    default:
      return `Error! ${formatName} is unknown formatname!`;
  }
};

export default getFormat;
