import getStylish from './stylish.js';
import plain from './plain.js';

const getFormat = (formatName) => {
  switch (formatName) {
    case 'plain':
      return plain;
    default:
      return getStylish;
  }
};

export default getFormat;
