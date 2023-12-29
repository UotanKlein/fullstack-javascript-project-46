install:
	npm ci

dependencies:
	npm install

test:
	npm test

coverage:
	npm run test -- --coverage

lint:
	npx eslint .

gendiff:
	npm link