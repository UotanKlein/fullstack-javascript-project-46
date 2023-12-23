
import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const outputParse = (obj) => JSON.parse(obj);

const outputReadFile = (filePath) => fs.readFileSync(filePath, 'utf8');

const outputResolve = (arg) => path.resolve(arg);

const parse = (arg1, arg2) => {
  const filePath1 = outputResolve(arg1);
  const filePath2 = outputResolve(arg2);

  const content1 = outputReadFile(filePath1)
  const content2 = outputReadFile(filePath2)

  const parse1 = outputParse(content1)
  const parse2 = outputParse(content2)

  return [parse1, parse2]
};

const comparisonObjs = (arg1, arg2) => {
  const [obj1, obj2] = parse(arg1, arg2);

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const mainArray = _.union(keys1, keys2).sort();

  const result = mainArray.reduce((acc, cur) => {
    const value1 = obj1[cur];
    const value2 = obj2[cur];

    if (value1 === value2) {
      return {...acc, [`  ${cur}`]: value1};
    }

    if (value1 !== undefined && value2 === undefined) {
      return {...acc, [`- ${cur}`]: value1};
    }

    if (value2 && !value1) {
      return {...acc, [`+ ${cur}`]: value2};
    }

    if ((value2 && value1) && (value1 !== value2)) {
      return {...acc, [`- ${cur}`]: value1, [`+ ${cur}`]: value2};
    }
  }, {})

  return JSON.stringify(result, null, 2).replace(/"/gi, '');
}

export default comparisonObjs;
