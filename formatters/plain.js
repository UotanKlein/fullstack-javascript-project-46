import _ from 'lodash';

const plain = (acc, value1, value2, format, path) => {
  let answer = acc;

  if ((!_.isUndefined(value2) && !_.isUndefined(value1)) && (value1 !== value2)) {
    answer = `Property '${path}' was updated. From ${JSON.stringify(value1)} to ${JSON.stringify(value2)}`;
  }

  if (_.isObject(value1) && _.isUndefined(value2)) {
    answer = `Property '${path}' was removed`;
  } else if (_.isObject(value2) && _.isUndefined(value1)) {
    answer = `Property '${path}' was added with value: [complex value]`;
  } else if (_.isObject(value1) && value2) {
    answer = `Property '${path}' was updated. From ${JSON.stringify(value2)} to [complex value]`;
  } else if (_.isObject(value2) && value1) {
    answer = `Property '${path}' was updated. From ${JSON.stringify(value1)} to [complex value]`;
  } else if (value1 === value2) {
    answer = '';
  } else if (!_.isUndefined(value1) && _.isUndefined(value2)) {
    answer = `Property '${path}' was removed`;
  } else if (!_.isUndefined(value2) && _.isUndefined(value1)) {
    answer = `Property '${path}' was added with value: ${JSON.stringify(value2)}`;
  }

  return answer;
};

export default plain;
