import _ from 'lodash';
import comparisonObjs from './comparison';
import parsing from './parse';

const stringify = (structure, replacer = ' ', spacesCount = 4) => { // Преобразованные объекты собирает в сравнение для вывода.
  const iter = (currentValue, depth) => {
    if (!Array.isArray(currentValue)) {
      return `${currentValue}`;
    }

    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const test = currentValue.map((arrObj) => {
      const lines = Object
        .entries(arrObj)
        .map(([, val]) => {
          const test2 = val.map((x) => {
            const { perfix, key, value } = x;

            return `${perfix.padStart(indentSize, currentIndent)}${key}: ${iter(value, depth + 1)}`;
          });

          return [...test2];
        }).flat();
      return [
        '{',
        ...lines,
        `${bracketIndent}}`,
      ].join('\n');
    });

    return test[0];
  };

  return iter(structure, 1);
};

const genDiff = (arg1, arg2, format = 'stylish') => {
  const parse = parsing(arg1, arg2, format);

  if (format === 'plain') {
    return _.flattenDeep(comparisonObjs(...parse, format)).filter((x) => x !== '')
      .reduce((acc, cur) => `${acc}\n${cur}`, '');
  }
  if (format === 'json') {
    return JSON.stringify(comparisonObjs(...parse, format), null, 2);
  }

  return stringify([comparisonObjs(...parse, format)]);
};

export default genDiff;
