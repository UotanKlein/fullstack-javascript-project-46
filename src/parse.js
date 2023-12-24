import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const convertYml = (content) => yaml.load(content);

const isJson = (filePath) => path.extname(filePath) === '.json';

const outputParse = (obj) => JSON.parse(obj);

const outputReadFile = (filePath) => fs.readFileSync(filePath, 'utf8');

const outputResolve = (arg) => path.resolve(arg);

const parsing = (arg1, arg2) => {
  const fullPath1 = outputResolve(arg1);
  const fullPath2 = outputResolve(arg2);

  const readFile1 = outputReadFile(fullPath1);
  const readFile2 = outputReadFile(fullPath2);

  const parse1 = isJson(fullPath1) ? outputParse(readFile1) : convertYml(readFile1);
  const parse2 = isJson(fullPath2) ? outputParse(readFile2) : convertYml(readFile2);

  return [parse1, parse2]
};

export default parsing;
