import fs from 'fs';
import path from 'path';
import AvaTest from './_base-ava-test.js';
import {fileURLToPath} from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const {test, mockPath, testSrcPath, nodePlop} = (new AvaTest(__filename));

var plop;
test.before(async () => {
	plop = await nodePlop(`${mockPath}/plopfile.js`);
});

/////
// if an action has no path, the action should fail
//

test.serial('nested generator should add file to main directory', async function (t) {
	const filePath = path.resolve(testSrcPath, 'nested-nestman.txt');
	const generator = plop.getGenerator('basic-nested');
	t.is(typeof generator.runPrompts, 'function');
	t.is(typeof generator.runActions, 'function');
	t.is(generator.name, 'basic-nested');

	const results = await generator.runActions({name: 'Nestman'});
	t.is(results.changes.length, 1);
	t.is(results.failures.length, 0);
	t.true(fs.existsSync(filePath));
});

test.serial('nested generator should not override existing helpers', async function (t) {
	const filePath = path.resolve(testSrcPath, 'addman.txt');
	const generator = plop.getGenerator('basic-add');
	t.is(typeof generator.runPrompts, 'function');
	t.is(typeof generator.runActions, 'function');
	t.is(generator.name, 'basic-add');

	const results = await generator.runActions({name: 'Addman'}).then();
	t.is(results.changes.length, 1);
	t.is(results.failures.length, 0);
	t.true(fs.existsSync(filePath));
});
