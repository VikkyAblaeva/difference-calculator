import _ from 'lodash';

const buildTree = (oldContent, newContent) => {
  const iter = (data1, data2) => {
    const data1Keys = Object.keys(data1);
    const data2keys = Object.keys(data2);
    const sortedKeys = _.sortBy(_.union(data1Keys, data2keys));
    const diffResult = sortedKeys.map((key) => {
      if (!_.has(data1, key)) {
        return { key, value: data2[key], status: 'added' };
      }
      if (!_.has(data2, key)) {
        return { key, value: data1[key], status: 'removed' };
      }
      if (data1[key] === data2[key]) {
        return { key, value: data1[key], status: 'unchanged' };
      }
      if (_.isObject(data1[key]) && _.isObject(data2[key])) {
        return { key, value: iter(data1[key], data2[key]), status: 'nested' };
      }
      return { key, value: { oldValue: data1[key], newValue: data2[key] }, status: 'updated' };
    });
    return diffResult;
  };
  return iter(oldContent, newContent);
};

export default buildTree;
