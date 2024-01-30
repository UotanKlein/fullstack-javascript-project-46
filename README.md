### Hexlet tests and linter status:
[![Actions Status](https://github.com/UotanKlein/fullstack-javascript-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/UotanKlein/fullstack-javascript-project-46/actions)

### Git Actions
[![CI](https://github.com/UotanKlein/fullstack-javascript-project-46/actions/workflows/ci.yml/badge.svg)](https://github.com/UotanKlein/fullstack-javascript-project-46/actions/workflows/ci.yml)

### Codeclimate
[![Maintainability](https://api.codeclimate.com/v1/badges/41362aedfc17944867b2/maintainability)](https://codeclimate.com/github/UotanKlein/fullstack-javascript-project-46/maintainability)

### Codecov
[![codecov](https://codecov.io/gh/UotanKlein/fullstack-javascript-project-46/graph/badge.svg?token=24XG7SNMCA)](https://codecov.io/gh/UotanKlein/fullstack-javascript-project-46)

# gendiff <filepath1> <filepath2>

Находит различия между глубокими и плоскими JSON и YAML файлами в виде stylish.

name1.json
```
{
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
```
name2.json
```
{
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
    "foo": {
      "test": "aboba"
    },
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
}
```
## gendiff ./name1.json ./name2.json 

Или gendiff -f ./name1.json ./name2.json или gendiff --format stylish ./name1.json ./name2.json

Output:
```
{
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
}
```
# gendiff --format plain <filepath1> <filepath2>

Находит различия между глубокими и плоскими JSON и YAML файлами в виде plain.

Output:
```
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
Property 'group3' was added with value: [complex value]
```
# gendiff --format json <filepath1> <filepath2>

Находит различия между глубокими и плоскими JSON и YAML файлами в виде json.

Output:
```
[{"key":"common","type":"nested","children":[{"key":"follow","type":"added","value":false},{"key":"setting1","type":"unchanged","value":"Value 1"},{"key":"setting2","type":"removed","value":200},{"key":"setting3","type":"changed","value1":true,"value2":null},{"key":"setting4","type":"added","value":"blah blah"},{"key":"setting5","type":"added","value":{"key5":"value5"}},{"key":"setting6","type":"nested","children":[{"key":"doge","type":"nested","children":[{"key":"wow","type":"changed","value1":"","value2":"so much"}]},{"key":"key","type":"unchanged","value":"value"},{"key":"ops","type":"added","value":"vops"}]}]},{"key":"group1","type":"nested","children":[{"key":"baz","type":"changed","value1":"bas","value2":"bars"},{"key":"foo","type":"unchanged","value":"bar"},{"key":"nest","type":"changed","value1":{"key":"value"},"value2":"str"}]},{"key":"group2","type":"removed","value":{"abc":12345,"deep":{"id":45}}},{"key":"group3","type":"added","value":{"deep":{"id":{"number":45}},"fee":100500}}]
```

# Аскинема
[![asciicast](https://asciinema.org/a/q6zR336jdrsaiG3rx3YJuc5Cv.svg)](https://asciinema.org/a/q6zR336jdrsaiG3rx3YJuc5Cv)
