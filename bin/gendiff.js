#!/usr/bin/env node

import { program } from 'commander';

import genDiff from '../src/parse.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .helpOption('-h, --help', 'output usage information')
  .action((filepath1, filepath2, type) => {
    if (type.format === 'plain') {
      console.log(genDiff(filepath1, filepath2, 'plain'));
    } else if (type.format === 'json') {
      console.log(genDiff(filepath1, filepath2, 'json'));
    } else {
      console.log(genDiff(filepath1, filepath2));
    }
  });

program.parse(process.argv);
