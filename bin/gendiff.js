#!/usr/bin/env node

import { program } from 'commander';

import genDiff from '../src/comparison.js'


program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format')
  .action(() => {
    const [arg1, arg2] = program.args;
    
    console.log(genDiff(arg1, arg2));
  });

program.parse(process.argv);
