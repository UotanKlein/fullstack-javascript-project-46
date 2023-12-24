import _ from 'lodash';

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

const comparisonObjs = (obj1, obj2) => {

  const mainArray = _.union(outputObjKeys(obj1), outputObjKeys(obj2)).sort();

  const result = mainArray.reduce((acc, cur) => {
    const value1 = obj1[cur];
    const value2 =obj2[cur];

    const add = '+ '
    const del = '- '
    const nothing = '  '

    if ((_.isObject(value1) && _.isObject(value2))) {
      return {...acc, [cur]: [{ perfix: nothing, key: cur, value: [comparisonObjs(value1, value2)] }]};
    }

    if (_.isObject(value1) && value2 === undefined) {
      return {...acc, [cur]: [{ perfix: del, key: cur, value: [otherChange(value1)] }]};
    }

    if (_.isObject(value2) && value1 === undefined) {
      return {...acc, [cur]: [{ perfix: add, key: cur, value: [otherChange(value2)] }]};
    }

    if (_.isObject(value1) && value2) {
      return {...acc, [cur]: [{ perfix: del, key: cur, value: [otherChange(value1)] }, { perfix: add, key: cur, value: value2 }]};
    }

    if (_.isObject(value2) && value1) {
      return {...acc, [cur]: [{ perfix: del, key: cur, value: [otherChange(value2)] }, { perfix: add, key: cur, value: value1 }]};
    }

    if (value1 === value2) {
      return {...acc, [cur]: [{ perfix: nothing, key: cur, value: value1 }]};
    }

    if (value1 !== undefined && value2 === undefined) {
      return {...acc, [cur]: [{ perfix: del, key: cur, value: value1 }]};
    }

    if (value2 !== undefined && value1 === undefined) {
      return {...acc, [cur]: [{ perfix: add, key: cur, value: value2 }] };
    }

    if ((value2 !== undefined && value1 !== undefined) && (value1 !== value2)) {
      return {...acc, [cur]: [{ perfix: del, key: cur, value: value1 }, { perfix: add, key: cur, value: value2 }] };
    }
    
    return acc;
  }, {})

  return result;
};

export default comparisonObjs;
