install:
	npm ci

dependencies:
	npm install

test:
	npm run test

coverage:
	npm run test -- --coverage

lint:
	npm run lint
