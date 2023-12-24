install:
	npm ci

test:
	npm run test

coverage:
	PATH=./node_modules/.bin:${PATH} npm test -- --coverage