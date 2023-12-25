import _ from 'lodash';

const outputObjKeys = (obj) => Object.keys(obj);

const otherChange = (obj) => {
  const keys = outputObjKeys(obj);

  const result = keys.reduce((acc, cur) => {
    const value1 = obj[cur];

    const nothing = '  ';

    if (_.isObject(value1)) {
      return { ...acc, [cur]: [{ perfix: nothing, key: cur, value: [otherChange(value1)] }] };
    }
    return { ...acc, [cur]: [{ perfix: nothing, key: cur, value: value1 }] };
  }, {});

  return result;
};

const createData = (cur, pref, val) => ({ perfix: pref, key: cur, value: val });

const createResponse = (acc, cur, ...perfval) => {
  const createInfo = perfval
    .reduce((accum, [pref, val]) => [...accum, createData(cur, pref, val)], []);
  return {
    ...acc,
    [cur]: createInfo,
  };
};
/* Взаимозависимые функции, я испольовал присваивание function вместо переменной,
  поэтому все должно быть ок, но линтер ругается, хотя все должно быть хорошо. */
function comparisonObjs(obj1, obj2) {
  const mainArray = _.union(outputObjKeys(obj1), outputObjKeys(obj2)).sort();
  // eslint-disable-next-line no-use-before-define
  return mainArray.reduce((acc, cur) => collectArrays(acc, cur, obj1, obj2), {});
}

function collectArrays(acc, cur, obj1, obj2) {
  const value1 = obj1[cur];
  const value2 = obj2[cur];

  const add = '+ ';
  const del = '- ';
  const nothing = '  ';

  let answer = acc;

  if ((!_.isUndefined(value2) && !_.isUndefined(value1)) && (value1 !== value2)) {
    answer = createResponse(acc, cur, [del, value1], [add, value2]);
  }

  if ((_.isObject(value1) && _.isObject(value2))) {
    // eslint-disable-next-line no-use-before-define
    answer = createResponse(acc, cur, [nothing, [comparisonObjs(value1, value2)]]);
  } else if (_.isObject(value1) && _.isUndefined(value2)) {
    answer = createResponse(acc, cur, [del, [otherChange(value1)]]);
  } else if (_.isObject(value2) && _.isUndefined(value1)) {
    answer = createResponse(acc, cur, [add, [otherChange(value2)]]);
  } else if (_.isObject(value1) && value2) {
    answer = createResponse(acc, cur, [del, [otherChange(value1)]], [add, value2]);
  } else if (_.isObject(value2) && value1) {
    answer = createResponse(acc, cur, [del, [otherChange(value2)]], [add, value1]);
  } else if (value1 === value2) {
    answer = createResponse(acc, cur, [nothing, value1]);
  } else if (!_.isUndefined(value1) && _.isUndefined(value2)) {
    answer = createResponse(acc, cur, [del, value1]);
  } else if (!_.isUndefined(value2) && _.isUndefined(value1)) {
    answer = createResponse(acc, cur, [add, value2]);
  }
  
  return answer;
}

export default comparisonObjs;
