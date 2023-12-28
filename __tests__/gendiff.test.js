import parsing from '../src/parse.js';

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
      - foo: {
            test: aboba
        }
      + foo: bar
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
Property 'group1.foo' was updated. From "bar" to [complex value]
Property 'group1.nest' was updated. From "str" to [complex value]
Property 'group2' was removed
Property 'group3' was added with value: [complex value]"
`;

test('comparison json files', () => {
  expect(parsing('data/file1.json', 'data/file2.json')).toMatchInlineSnapshot(answer1);
});

test('comparison yaml files', () => {
  expect(parsing('data/file1.yml', 'data/file2.yml')).toMatchInlineSnapshot(answer1);
});

test('comparison flatten json files', () => {
  expect(parsing('data/flatfile1.json', 'data/flatfile2.json')).toMatchInlineSnapshot(answer2);
});

test('comparison flatten json files plain', () => {
  expect(parsing('data/file1.json', 'data/file2.json', 'plain')).toMatchInlineSnapshot(answer3);
});

test('comparison flatten yaml files plain', () => {
  expect(parsing('data/file1.yml', 'data/file2.yml', 'plain')).toMatchInlineSnapshot(answer3);
});
