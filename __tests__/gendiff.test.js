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

test('comparison json', () => {
  expect(parsing('data/file1.json', 'data/file2.json')).toMatchInlineSnapshot(answer1);
});

test('comparison yaml', () => {
  expect(parsing('data/file1.yml', 'data/file2.yml')).toMatchInlineSnapshot(answer1);
});

test('comparison flatten file', () => {
  expect(parsing('data/flatfile1.json', 'data/flatfile2.json')).toMatchInlineSnapshot(answer2);
});
