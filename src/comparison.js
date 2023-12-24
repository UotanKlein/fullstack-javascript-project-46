import _ from 'lodash';

const file1 = {
  "common": {
    "setting1": "Value 1",
    "setting2": 200,
    "setting3": true,
    "setting6": {
      "key": "value",
      "doge": {
        "wow": ""
      }
    }
  },
  "group1": {
    "baz": "bas",
    "foo": "bar",
    "nest": {
      "key": "value"
    }
  },
  "group2": {
    "abc": 12345,
    "deep": {
      "id": 45
    }
  }
}

const file2 = {
  "common": {
    "follow": false,
    "setting1": "Value 1",
    "setting3": null,
    "setting4": "blah blah",
    "setting5": {
      "key5": "value5"
    },
    "setting6": {
      "key": "value",
      "ops": "vops",
      "doge": {
        "wow": "so much"
      }
    }
  },
  "group1": {
    "foo": "bar",
    "baz": "bars",
    "nest": "str"
  },
  "group3": {
    "deep": {
      "id": {
        "number": 45
      }
    },
    "fee": 100500
  }
};

const outputObjKeys = (obj) => Object.keys(obj);

const comparisonObjs = (obj1, obj2) => {

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

    if (value2 !== undefined && !value1) {
      return {...acc, [`+ ${cur}`]: value2};
    }

    if ((_.isObject(value1) && _.isObject(value2)) && !Array.isArray(value1) && !Array.isArray(value1)) {
      return {...acc, [`  ${cur}`]: comparisonObjs(value1, value2)};
    }

    if ((value2 !== undefined && value1 !== undefined) && (value1 !== value2)) {
      return {...acc, [`- ${cur}`]: value1, [`+ ${cur}`]: value2};
    }
    
    return undefined;
  }, {})

  return result;
};

export default comparisonObjs;
