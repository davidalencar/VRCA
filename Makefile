
SRC_PATH:=src

install:
	npm install --prefix $(SRC_PATH)

lint:
	npm run --prefix $(SRC_PATH) lint

lint-fix:
	npm run --prefix $(SRC_PATH) lint-fix

start:
	npm run --prefix $(SRC_PATH) start

st-dev:
	npm run --prefix $(SRC_PATH) start-dev

import-data:
	npm run --prefix $(SRC_PATH) import-data
	npm run --prefix $(SRC_PATH) import-data-test

import-data-test:
	npm run --prefix $(SRC_PATH) import-data-test

test:
	npm run --prefix $(SRC_PATH) test
