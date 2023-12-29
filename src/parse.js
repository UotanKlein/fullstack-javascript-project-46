import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import _ from 'lodash';
import comparisonObjs from './comparison';

const convertYml = (content) => yaml.load(content); // Конвертирует yaml в json
const isJson = (filePath) => path.extname(filePath) === '.json'; // Проверяет является ли объект json
const outputParse = (obj) => JSON.parse(obj); // Парсит json объект
const outputReadFile = (filePath) => fs.readFileSync(filePath, 'utf8'); // Читает файл и возвращает содерание
const outputResolve = (arg) => path.resolve(arg); // Возвращает полный путь до файла

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

const parsing = (arg1, arg2) => {
  const fullPath1 = outputResolve(arg1);
  const fullPath2 = outputResolve(arg2);

  const readFile1 = outputReadFile(fullPath1);
  const readFile2 = outputReadFile(fullPath2);

  const parse1 = isJson(fullPath1) ? outputParse(readFile1) : convertYml(readFile1);
  const parse2 = isJson(fullPath2) ? outputParse(readFile2) : convertYml(readFile2);

  return [parse1, parse2];
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
