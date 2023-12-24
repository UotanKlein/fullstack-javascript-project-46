
import parsing from '../src/parse.js';

const answer1 = `
"{
  - follow: false,
    host: hexlet.io,
  - proxy: 123.234.53.22,
  - timeout: 50,
  + timeout: 20,
  + verbose: true
}"
`;

test('comparison two json', () => {
  expect(parsing('data/file1.json', 'data/file2.json')).toMatchInlineSnapshot(answer1);
})
