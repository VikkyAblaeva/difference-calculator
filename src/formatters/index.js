import getStylish from './stylish.js';
import getPlainFormat from './plain.js';
import getJsonFormat from './json.js';

const getFormat = (formatName) => {
  switch (formatName) {
    case 'plain':
      return getPlainFormat;
    case 'json':
      return getJsonFormat;
    case 'getStylish':
      return getStylish;
    default:
      return 'Error! Unknown formatname!';
  }
};

export default getFormat;
