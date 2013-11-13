clean:
	rm -rf node_modules/*

install:
	npm install

build: install
	./node_modules/.bin/grunt

test:
	./node_modules/.bin/jshint app.js lib/* --config test/jshint/config.json
	@NODE_ENV=test ./node_modules/.bin/mocha --recursive --reporter spec --timeout 3000 test/unit

test-cov:
	@NODE_ENV=test ./node_modules/.bin/mocha --require blanket --recursive --timeout 3000 -R travis-cov test/unit

test-cov-html:
	@NODE_ENV=test ./node_modules/.bin/mocha --require blanket --recursive --timeout 3000 -R html-cov test/unit > test/coverage.html
	xdg-open "file://${CURDIR}/test/coverage.html" &

test-int:
	./node_modules/.bin/harvey -t test/integration/clientTests.json -c test/integration/config.json -a test/integration/resources.json -r console
	./node_modules/.bin/harvey -t test/integration/permissionsTests.json -c test/integration/config.json -a test/integration/resources.json -r console

.PHONY: test test-cov test-cov-html test-int
