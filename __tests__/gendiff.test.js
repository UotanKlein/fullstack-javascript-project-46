import genDiff from '../index.js';

const answer1 = `
"{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}"
`;

const answer2 = `
"{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}"
`;

const answer3 = `
"
Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: "blah blah"
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From "" to "so much"
Property 'common.setting6.ops' was added with value: "vops"
Property 'group1.baz' was updated. From "bas" to "bars"
Property 'group1.nest' was updated. From "str" to [complex value]
Property 'group2' was removed
Property 'group3' was added with value: [complex value]"
`;

const answer4 = `
"{
  "follow": {
    "oldValue": null,
    "newValue": false
  },
  "setting1": {
    "oldValue": "Value 1",
    "newValue": "Value 1"
  },
  "setting2": {
    "oldValue": 200,
    "newValue": null
  },
  "setting3": {
    "oldValue": true,
    "newValue": null
  },
  "setting4": {
    "oldValue": null,
    "newValue": "blah blah"
  },
  "setting5": {
    "oldValue": null,
    "newValue": {
      "key5": "value5"
    }
  },
  "wow": {
    "oldValue": "",
    "newValue": "so much"
  },
  "key": {
    "oldValue": "value",
    "newValue": "value"
  },
  "ops": {
    "oldValue": null,
    "newValue": "vops"
  },
  "baz": {
    "oldValue": "bas",
    "newValue": "bars"
  },
  "foo": {
    "oldValue": "bar",
    "newValue": "bar"
  },
  "nest": {
    "oldValue": {
      "key": "value"
    },
    "newValue": "str"
  },
  "group2": {
    "oldValue": {
      "abc": 12345,
      "deep": {
        "id": 45
      }
    },
    "newValue": null
  },
  "group3": {
    "oldValue": null,
    "newValue": {
      "deep": {
        "id": {
          "number": 45
        }
      },
      "fee": 100500
    }
  }
}"
`;

test('comparison json files', () => {
  expect(genDiff('data/file1.json', 'data/file2.json')).toMatchInlineSnapshot(answer1);
});

test('comparison yaml files', () => {
  expect(genDiff('data/file1.yml', 'data/file2.yml')).toMatchInlineSnapshot(answer1);
});

test('comparison flatten json files', () => {
  expect(genDiff('data/flatfile1.json', 'data/flatfile2.json')).toMatchInlineSnapshot(answer2);
});

test('comparison json files plain', () => {
  expect(genDiff('data/file1.json', 'data/file2.json', 'plain')).toMatchInlineSnapshot(answer3);
});

test('comparison yaml files plain', () => {
  expect(genDiff('data/file1.yml', 'data/file2.yml', 'plain')).toMatchInlineSnapshot(answer3);
});

test('comparison json files json', () => {
  expect(genDiff('data/file1.json', 'data/file2.json', 'json')).toMatchInlineSnapshot(answer4);
});

test('comparison yaml files json', () => {
  expect(genDiff('data/file1.yml', 'data/file2.yml', 'json')).toMatchInlineSnapshot(answer4);
});
