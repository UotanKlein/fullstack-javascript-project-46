import _ from 'lodash';
import createResponse from '../src/func';

const otherChange = (obj) => { // Приводит элементы внутри объекта в общую форму.
  const keys = Object.keys(obj);

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

const stylish = (acc, cur, value1, value2) => {
  const add = '+ ';
  const del = '- ';
  const nothing = '  ';

  let answer = acc;

  if ((!_.isUndefined(value2) && !_.isUndefined(value1)) && (value1 !== value2)) {
    answer = createResponse(acc, cur, [del, value1], [add, value2]);
  }

  if (_.isObject(value1) && _.isUndefined(value2)) {
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
};

export default stylish;
