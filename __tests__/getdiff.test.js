import { fileURLToPath } from 'url';
import { expect, test } from '@jest/globals';
import fs from 'fs';
import path, { dirname } from 'path';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const readFile = (filename) => fs.readFileSync(getFixturePath(`${filename}.txt`), 'utf-8');

const json = readFile('json');
const plain = readFile('plain');
const stylish = readFile('stylish');

test('stylish formatter', () => {
  const expectResultJSON = gendiff('__fixtures__/file1.json', '__fixtures__/file2.json');
  const expectResultYML = gendiff('__fixtures__/file1.yml', '__fixtures__/file2.yml');
  expect(expectResultJSON).toEqual(stylish);
  expect(expectResultYML).toEqual(stylish);
});

test('plain formatter', () => {
  const expectResultJSON = gendiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'plain');
  const expectResultYML = gendiff('__fixtures__/file1.yml', '__fixtures__/file2.yml', 'plain');
  expect(expectResultJSON).toEqual(plain);
  expect(expectResultYML).toEqual(plain);
});

test('json formatter', () => {
  const expectResultJSON = gendiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'json');
  const expectResultYML = gendiff('__fixtures__/file1.yml', '__fixtures__/file2.yml', 'json');
  expect(expectResultJSON).toEqual(json);
  expect(expectResultYML).toEqual(json);
});
