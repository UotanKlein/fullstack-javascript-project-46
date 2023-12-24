#!/usr/bin/env node

import { program } from 'commander';

import parsing from '../src/parse.js'


program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format')
  .action(() => {
    const [arg1, arg2] = program.args;
    
    console.log(parsing(arg1, arg2));
  });

program.parse(process.argv);
