import stylish from './stylish';
import plain from './plain';
import json from './json';

const findAnswer = (acc, cur, value1, value2, format, path) => {
  let result;

  if (format === 'plain') {
    result = plain(acc, value1, value2, path);
  } else if (format === 'stylish') {
    result = stylish(acc, cur, value1, value2);
  } else if (format === 'json') {
    result = json(acc, value1, value2, cur);
  }

  return result;
};

export default findAnswer;
