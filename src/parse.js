
import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const outputParse = (obj) => JSON.parse(obj);

const outputReadFile = (filePath) => fs.readFileSync(filePath, 'utf8');

const outputResolve = (arg) => path.resolve(arg);

const outputObjKeys = (obj) => Object.keys(obj);

const parse = (arg1, arg2) => {
  const parse1 = outputParse(outputReadFile(outputResolve(arg1)));
  const parse2 = outputParse(outputReadFile(outputResolve(arg2)));

  return [parse1, parse2]
};

const comparisonObjs = (arg1, arg2) => {
  const [obj1, obj2] = parse(arg1, arg2);

  const mainArray = _.union(outputObjKeys(obj1), outputObjKeys(obj2)).sort();

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

    return undefined;
  }, {})

  return JSON.stringify(result, null, 2).replace(/"/gi, '');
}

export default comparisonObjs;
