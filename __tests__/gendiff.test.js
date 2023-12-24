
import comparisonObjs from '../src/comparison.js';

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
  expect(comparisonObjs('data/file1.json', 'data/file2.json')).toMatchInlineSnapshot(answer1);
})