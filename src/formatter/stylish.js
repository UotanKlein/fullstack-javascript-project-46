import _ from 'lodash';

const types = {
  added: '+ ',
  removed: '- ',
  unchanged: '  ',
  nested: '  ',
};
const replacer = ' ';

const indent = (depth) => replacer.repeat(depth);

const stringify = (currentValue, depth) => {
  if (!_.isObject(currentValue)) {
    return `${currentValue}`;
  }
  const lines = Object
    .entries(currentValue)
    .flatMap(([key, val]) => `${indent(depth + 8)}${key}: ${stringify(val, depth + 4)}`);
  return ['{', ...lines, `${indent(depth + 4)}}`].join('\n');
};

const stylish = (diffTree) => {
  const innerFormat = (innerDiffTree, depth) => {
    if (!_.isObject(innerDiffTree)) {
      return `${innerDiffTree}`;
    }
    const strings = innerDiffTree.map((node) => {
      if (node.type === 'nested') {
        return `${indent(depth + 2)}${types[node.type]}${node.key}: ${innerFormat(node.children, depth + 4)}`;
      }
      if (node.type === 'changed') {
        return `${indent(depth + 2)}${types.removed}${node.key}: ${stringify(node.value1, depth)}
${indent(depth + 2)}${types.added}${node.key}: ${stringify(node.value2, depth)}`;
      }
      return `${indent(depth + 2)}${types[node.type]}${node.key}: ${stringify(node.value, depth)}`;
    });
    return ['{', ...strings, `${indent(depth)}}`].join('\n');
  };
  return [innerFormat(diffTree, 0)].join('\n');
};

export default stylish;
