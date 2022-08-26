import _ from 'lodash';

const getLine = (params, spacesCount = 4) => {
  const [key, value, char, depth] = params;
  return `  ${' '.repeat(spacesCount).repeat(depth - 1)}${char}${key}: ${value}`;
};

const getStylishFormat = (body, depth, spacesCount = 4) => `{\n${body}\n${' '.repeat(spacesCount).repeat(depth)}}`;

const getValue = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const entries = Object.entries(value);
  const items = entries.map(([key, val]) => getLine([key, getValue(val, depth + 1), '  ', depth + 1]));
  const body = items.join('\n');
  return getStylishFormat(body, depth);
};

const stylish = (diff, depth) => {
  const diffLines = diff.flatMap(({ key, value, status }) => {
    const symbols = { added: '+ ', removed: '- ', unchanged: '  ' };
    switch (status) {
      case 'updated':
        return [getLine([key, getValue(value.oldValue, depth + 1), symbols.removed, depth + 1]),
          getLine([key, getValue(value.newValue, depth + 1), symbols.added, depth + 1])];
      case 'nested':
        return getLine([key, stylish(value, depth + 1), '  ', depth + 1]);
      default:
        return getLine([key, getValue(value, depth + 1), symbols[status], depth + 1]);
    }
  });
  const formattedDiffs = diffLines.join('\n');
  return getStylishFormat(formattedDiffs, depth);
};

const formatStylish = (diff) => stylish(diff, 0);

export default formatStylish;
