import _ from 'lodash';

const json = (acc, value1, value2, cur) => {
  let answer = acc;

  if ((!_.isUndefined(value2) && !_.isUndefined(value1)) && (value1 !== value2)) {
    answer = { [cur]: { oldValue: value1, newValue: value2 } };
  }

  if (_.isObject(value1) && _.isUndefined(value2)) {
    answer = { [cur]: { oldValue: value1, newValue: null } };
  } else if (_.isObject(value2) && _.isUndefined(value1)) {
    answer = { [cur]: { oldValue: null, newValue: value2 } };
  } else if (_.isObject(value1) && value2) {
    answer = { [cur]: { oldValue: value1, newValue: value2 } };
  } else if (_.isObject(value2) && value1) {
    answer = { [cur]: { oldValue: value1, newValue: value2 } };
  } else if (value1 === value2) {
    answer = { [cur]: { oldValue: value1, newValue: value2 } };
  } else if (!_.isUndefined(value1) && _.isUndefined(value2)) {
    answer = { [cur]: { oldValue: value1, newValue: null } };
  } else if (!_.isUndefined(value2) && _.isUndefined(value1)) {
    answer = { [cur]: { oldValue: null, newValue: value2 } };
  }

  return answer;
};

export default json;
