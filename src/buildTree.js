import _ from 'lodash';

const buildTree = (oldContent, newContent) => {
  const iter = (oldData, newData) => {
    const oldDataKeys = Object.keys(oldData);
    const newDatakeys = Object.keys(newData);
    const objectsKeys = _.sortBy(_.union(oldDataKeys, newDatakeys));
    const diffResult = objectsKeys.map((key) => {
      if (!_.has(oldData, key)) {
        return { key, value: newData[key], status: 'added' };
      }
      if (!_.has(newData, key)) {
        return { key, value: oldData[key], status: 'removed' };
      }
      if (oldData[key] === newData[key]) {
        return { key, value: oldData[key], status: 'unchanged' };
      }
      if (_.isObject(oldData[key]) && _.isObject(newData[key])) {
        return { key, value: iter(oldData[key], newData[key]), status: 'nested' };
      }
      return { key, value: { oldValue: oldData[key], newValue: newData[key] }, status: 'updated' };
    });
    return diffResult;
  };
  return iter(oldContent, newContent);
};

export default buildTree;
