import _ from 'lodash';
import findAnswer from '../formatters/index.js';
import createResponse from './func.js';

const isPlain = (format) => format === 'plain';

function comparisonObjs(obj1, obj2, format, path = '') {
  const unionKeys = _.union(Object.keys(obj1), Object.keys(obj2)).sort();
  const initialValue = isPlain(format) ? [] : {};
  return unionKeys.reduce((acc, cur) => {
    const truePath = path === '' ? cur : `${path}.${cur}`;
    const value1 = obj1[cur];
    const value2 = obj2[cur];

    if ((_.isObject(value1) && _.isObject(value2))) {
      if (format === 'stylish') {
        return createResponse(acc, cur, [' ', [comparisonObjs(value1, value2, format, truePath)]]);
      }
      if (format === 'plain') {
        return [...acc, comparisonObjs(value1, value2, format, truePath)];
      }
      if (format === 'json') {
        return { ...acc, ...comparisonObjs(value1, value2, format, truePath) };
      }
    }

    if (format === 'plain') {
      return [...acc, findAnswer(acc, cur, value1, value2, format, truePath)];
    }
    if (format === 'stylish') {
      return findAnswer(acc, cur, value1, value2, format, truePath);
    }
    if (format === 'json') {
      return { ...acc, ...findAnswer(acc, cur, value1, value2, format, truePath) };
    }
    return acc;
  }, initialValue);
}

export default comparisonObjs;
