import * as fspp from '../src/fs-promise-proxy.js';
import path from 'path';
import AvaTest from './_base-ava-test.js';
import {fileURLToPath} from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const {test, testSrcPath, nodePlop} = (new AvaTest(__filename));

var plop;
test.before(async () => {
	plop = await nodePlop();
});

test('Check that an empty file has been created', async function (t) {
	plop.setGenerator('no-template', {
		actions: [{
			type: 'add',
			path: `${testSrcPath}/{{dashCase name}}.txt`
		}]
	});

	const name = 'no-template';
	const results = await plop.getGenerator(name).runActions({name});
	const {changes, failures} = results;
	const filePath = path.resolve(testSrcPath, `${name}.txt`);
	const content = await fspp.readFile(filePath);

	t.is(changes.length, 1);
	t.is(failures.length, 0);
	t.true(await fspp.fileExists(filePath));
	t.is(content, '');
});
