import stylish from './stylish.js';
import plain from './plain.js';

const findAnswer = (acc, cur, value1, value2, format, path) => {
  let result;

  if (format === 'plain') {
    result = plain(acc, value1, value2, format, path);
  } else if (format === 'stylish') {
    result = stylish(acc, cur, value1, value2);
  } else if (format === 'json') {
    result = null;
  }

  return result;
};

export default findAnswer;
