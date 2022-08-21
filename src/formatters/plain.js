import _ from 'lodash';

const getLine = (key, status, newValue = 0, oldValue = 0) => {
  switch (status) {
    case 'removed':
      return `Property '${key.slice(1, key.length)}' was removed`;
    case 'added':
      return `Property '${key.slice(1, key.length)}' was added with value: ${newValue}`;
    case 'updated':
      return `Property '${key.slice(1, key.length)}' was updated. From ${oldValue} to ${newValue}`;
    default:
      return 'Error! Unknown status!';
  }
};

const getValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return value;
};

const getPlainFormat = (diff, path = '') => {
  const filteredDiff = diff.filter((item) => item.status !== 'unchanged');
  const items = filteredDiff.map((item) => {
    const newPath = `${path}.${item.key}`;
    if (item.status === 'removed') {
      return getLine(newPath, item.status, getValue(item.value));
    }
    if (item.status === 'added') {
      return getLine(newPath, item.status, getValue(item.value));
    }
    if (item.status === 'updated') {
      const newValue = getValue(item.value.newValue);
      const oldValue = getValue(item.value.oldValue);
      return getLine(newPath, item.status, newValue, oldValue);
    }
    return getPlainFormat(item.value, newPath);
  });
  return items.join('\n');
};

export default getPlainFormat;
