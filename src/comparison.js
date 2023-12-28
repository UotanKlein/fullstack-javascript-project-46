import _ from 'lodash';
import findAnswer from '../formatters/index.js';
import createResponse from './func.js';

const isPlain = (format) => format === 'plain'; // Проверяет является ли формат plain

/* Взаимозависимые функции, я испольовал присваивание function вместо переменной,
  поэтому все должно быть ок, но линтер ругается, хотя все должно быть хорошо. */
function comparisonObjs(obj1, obj2, format, path = '') { // Объединяет объекты и вызывает конвертацию.
  const mainArray = _.union(Object.keys(obj1), Object.keys(obj2)).sort();
  const initialValue = isPlain(format) ? [] : {};
  return mainArray.reduce((acc, cur) => {
    const truePath = path === '' ? cur : `${path}.${cur}`;
    // eslint-disable-next-line no-use-before-define
    const value1 = obj1[cur];
    const value2 = obj2[cur];

    if ((_.isObject(value1) && _.isObject(value2))) {
      // eslint-disable-next-line no-use-before-define
      if (format === 'stylish') {
        return createResponse(acc, cur, [' ', [comparisonObjs(value1, value2, format, truePath)]]);
      }
      if (format === 'plain') {
        // eslint-disable-next-line no-use-before-define
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
