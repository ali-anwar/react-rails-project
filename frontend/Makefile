setup:
	npm ci

server:
	npm start

test: unit-tests integration-tests-regular integration-tests-manager integration-tests-admin
	echo Done

unit-tests:
	npm run unit-tests

integration-tests-manager:
	npm run test -t integration_tests/managerUser.test.js

integration-tests-admin:
	npm run test -t integration_tests/adminUser.test.js

integration-tests-regular:
	npm run test -t integration_tests/regularUser.test.js
