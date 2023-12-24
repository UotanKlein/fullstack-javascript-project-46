install:
	npm ci

dependencies:
	npm install

test:
	npm run test

coverage:
	npm run test -- --coverage
	./cc-test-reporter format-coverage -t lcov -o codeclimate.lcov
	./cc-test-reporter upload-coverage

lint:
	npm run lint
