import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import comparisonObjs from './comparison.js';

const convertYml = (content) => yaml.load(content);

const isJson = (filePath) => path.extname(filePath) === '.json';

const outputParse = (obj) => JSON.parse(obj);

const outputReadFile = (filePath) => fs.readFileSync(filePath, 'utf8');

const outputResolve = (arg) => path.resolve(arg);

const stringify = (structure, replacer = ' ', spacesCount = 4) => {
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

  return stringify([comparisonObjs(parse1, parse2)]);
};

export default parsing;
