import _ from 'lodash';

//Рефакторинг!!!!

const outputObjKeys = (obj) => Object.keys(obj);

const otherChange = (obj) => {
  const keys = outputObjKeys(obj);

  const result = keys.reduce((acc, cur) => {
    const value1 = obj[cur];

    const nothing = '  '

    if (_.isObject(value1)) {
      return { ...acc, [cur]: [{ perfix: nothing, key: cur, value: [otherChange(value1)]}] };
    }
    return { ...acc, [cur]: [{ perfix: nothing, key: cur, value: value1 }] };
  }, {})

  return result;
}

const  collectArrays = (acc, cur, obj1, obj2) => {
  const value1 = obj1[cur];
  const value2 = obj2[cur];

  const add = '+ '
  const del = '- '
  const nothing = '  '

  let answer = acc;

  if ((_.isObject(value1) && _.isObject(value2))) {
    answer = {...acc, [cur]: [{ perfix: nothing, key: cur, value: [comparisonObjs(value1, value2)] }]};
  } else if (_.isObject(value1) && _.isUndefined(value2)) {
    answer ={...acc, [cur]: [{ perfix: del, key: cur, value: [otherChange(value1)] }]};
  } else if (_.isObject(value2) && _.isUndefined(value1)) {
    answer = {...acc, [cur]: [{ perfix: add, key: cur, value: [otherChange(value2)] }]};
  } else if (_.isObject(value1) && value2) {
    answer = {...acc, [cur]: [{ perfix: del, key: cur, value: [otherChange(value1)] }, { perfix: add, key: cur, value: value2 }]};
  } else if (_.isObject(value2) && value1) {
    answer = {...acc, [cur]: [{ perfix: del, key: cur, value: [otherChange(value2)] }, { perfix: add, key: cur, value: value1 }]};
  } else if (value1 === value2) {
    answer = {...acc, [cur]: [{ perfix: nothing, key: cur, value: value1 }]};
  } else if (!_.isUndefined(value1) && _.isUndefined(value2)) {
    answer = {...acc, [cur]: [{ perfix: del, key: cur, value: value1 }]};
  } else if (!_.isUndefined(value2) && _.isUndefined(value1)) {
    answer = {...acc, [cur]: [{ perfix: add, key: cur, value: value2 }] };
  } else if ((!_.isUndefined(value2) && !_.isUndefined(value1)) && (value1 !== value2)) {
    answer = {...acc, [cur]: [{ perfix: del, key: cur, value: value1 }, { perfix: add, key: cur, value: value2 }] };
  }
  
  return answer;
}

const comparisonObjs = (obj1, obj2) => {
  const mainArray = _.union(outputObjKeys(obj1), outputObjKeys(obj2)).sort();

  return mainArray.reduce((acc, cur) => collectArrays(acc, cur, obj1, obj2), {});
};

export default comparisonObjs;
