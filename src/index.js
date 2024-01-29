import path from 'path';
import fs from 'fs';
import format from './formatter/index.js';
import getDiffTree from './getdiff.js';
import parse from './parsers.js';

const getFullPath = (filePath) => path.resolve(process.cwd(), filePath).trim();
const readFile = (filepath) => fs.readFileSync(getFullPath(filepath), 'utf-8');
const getFormat = (filepath) => path.extname(filepath).slice(1);

const gendiff = (path1, path2, formatName = 'stylish') => {
  const pathContent1 = readFile(path1);
  const pathContent2 = readFile(path2);
  const data1 = parse(pathContent1, getFormat(path1));
  const data2 = parse(pathContent2, getFormat(path2));
  const diffTree = getDiffTree(data1, data2);
  return format(diffTree, formatName);
};

export default gendiff;
