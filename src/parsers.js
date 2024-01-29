import yaml from 'js-yaml';

const parse = (data, extname) => {
  switch (extname) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
    case 'yaml':
      return yaml.load(data);
    default:
      throw new Error(`Unknown format: '${extname}'!`);
  }
};
export default parse;
