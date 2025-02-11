import AvaTest from './_base-ava-test.js';
import {fileURLToPath} from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const {test, nodePlop} = (new AvaTest(__filename));

var plop;
test.before(async () => {
	plop = await nodePlop();
});

test.beforeEach(() => {
	plop.setGenerator('no-path', {
		actions: [
			{ type: 'add', template: '{{name}}', abortOnFail: false },
			{ type: 'add', path: '', template: '{{name}}' }
		]
	});
});

test('Check that the file has been created', async function (t) {
	const name = 'no path';
	const results = await plop.getGenerator('no-path').runActions({name});
	const {changes, failures} = results;

	t.is(changes.length, 0);
	t.is(failures.length, 2);
	t.is(failures[0].error, 'Invalid path "undefined"');
	t.is(failures[1].error, 'Invalid path ""');
});
