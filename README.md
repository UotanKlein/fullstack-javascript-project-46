### Hexlet tests and linter status:
[![Actions Status](https://github.com/UotanKlein/fullstack-javascript-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/UotanKlein/fullstack-javascript-project-46/actions)


# gendiff <filepath1> <filepath2>

Находит различия между плоскими файлами (JSON).

name1.json
{
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
}

name2.json
{
  "timeout": 20,
  "verbose": true,
  "host": "hexlet.io"
}

## gendiff ../name1.json ../name2.json

Output:
{
  - follow: false,
    host: hexlet.io,
  - proxy: 123.234.53.22,
  - timeout: 50,
  + timeout: 20,
  + verbose: true
}
