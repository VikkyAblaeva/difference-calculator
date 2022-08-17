import getStylish from './stylish.js';
import plain from './plain.js';
import getJsonFormat from './json.js';

const getFormat = (formatName) => {
  switch (formatName) {
    case 'plain':
      return plain;
    case 'json':
      return getJsonFormat;
    default:
      return getStylish;
  }
};

export default getFormat;
