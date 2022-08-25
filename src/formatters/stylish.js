import _ from 'lodash';

const getLine = (key, value, char, depth) => `  ${' '.repeat(4).repeat(depth - 1)}${char}${key}: ${value}`;

const getBodyWithIndentations = (body, depth) => `{\n${body}\n${' '.repeat(4).repeat(depth)}}`;

const getValue = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const entries = Object.entries(value);
  const items = entries.map(([key, val]) => getLine(key, getValue(val, depth + 1), '  ', depth + 1));
  const body = items.join('\n');
  return getBodyWithIndentations(body, depth);
};

const stylish = (diff, depth) => {
  const diffsOutput = diff.flatMap(({ key, value, status }) => {
    const symbols = { added: '+ ', removed: '- ', unchanged: '  ' };
    if (status === 'updated') {
      return [getLine(key, getValue(value.oldValue, depth + 1), symbols.removed, depth + 1),
        getLine(key, getValue(value.newValue, depth + 1), symbols.added, depth + 1)];
    }
    if (status === 'nested') {
      return getLine(key, stylish(value, depth + 1), '  ', depth + 1);
    }
    return getLine(key, getValue(value, depth + 1), symbols[status], depth + 1);
  });
  const diffLines = diffsOutput.join('\n');
  return getBodyWithIndentations(diffLines, depth);
};

const formatStylish = (diff) => stylish(diff, 0);

export default formatStylish;
