import _ from 'lodash';

const getValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const getNodeName = (node, parent) => {
  if (parent === '') {
    return `${node.key}`;
  }
  return `${parent}.${node.key}`;
};

const format = (diff, parent = '') => {
  const strings = diff
    .filter((node) => node.type !== 'unchanged')
    .map((node) => {
      if (node.type === 'added') {
        return `Property '${getNodeName(node, parent)}' was added with value: ${getValue(node.value)}`;
      }
      if (node.type === 'removed') {
        return `Property '${getNodeName(node, parent)}' was removed`;
      }
      if (node.type === 'changed') {
        return `Property '${getNodeName(node, parent)}' was updated. From ${getValue(node.value1)} to ${getValue(node.value2)}`;
      }
      return format(node.children, getNodeName(node, parent));
    });
  const result = strings.join('\n');
  return result;
};

export default format;
