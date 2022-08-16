import _ from 'lodash';

function findPath(obj, prop) {
  let path = '';
  if (_.has(obj, prop)) {
    return prop;
  }
  const props = Object.keys(obj);
  for (let i = props.length; i >= 0; i -= 1) {
    if (typeof obj[props[i]] === 'object') {
      path = findPath(obj[props[i]], prop);
    }
    if (path) {
      return `${props[i]}.${path}`;
    }
  }
  return null;
}

const getLine = (key, status, newValue = 0, oldValue = 0) => {
  switch (status) {
    case 'removed':
      return `Property '${key}' was removed`;
    case 'added':
      return `Property '${key}' was added with value: ${newValue}`;
    case 'updated':
      return `Property '${key}' was updated. From ${oldValue} to ${newValue}`;
    case 'unchanged':
      return '';
    default:
      return 'Error! Unknown status!';
  }
};

const getValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const plain = (diff, tree1, tree2) => {
  const items = diff.flatMap(({ key, value, status }) => {
    if (status === 'nested') {
      return (plain(value, tree1, tree2));
    }
    if (status === 'added') {
      if (!_.isObject(value)) {
        return getLine(findPath(tree2, key), status, getValue(value));
      }
      return getLine(findPath(tree2, key), status, '[complex value]');
    }
    if (status === 'updated') {
      if (!_.isObject(value.newValue) && !_.isObject(value.oldValue)) {
        return getLine(
          findPath(tree1, key),
          status,
          getValue(value.newValue),
          getValue(value.oldValue),
        );
      }
      if (!_.isObject(value.newValue) && _.isObject(value.oldValue)) {
        return getLine(findPath(tree1, key), status, getValue(value.newValue), '[complex value]');
      }
      if (_.isObject(value.newValue) && !_.isObject(value.oldValue)) {
        return getLine(findPath(tree1, key), status, '[complex value]', getValue(value.oldValue));
      }
    }
    return getLine(findPath(tree1, key), status, getValue(value));
  });
  const filtereditems = items.filter((item) => item !== '');
  return filtereditems.join('\n');
};

export default plain;
