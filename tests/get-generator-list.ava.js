import AvaTest from './_base-ava-test.js';
import {fileURLToPath} from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const {test, nodePlop} = (new AvaTest(__filename));

var plop;
test.before(async () => {
	plop = await nodePlop();
});

/////
// if an action has no path, the action should fail
//

test('set generator should return the generator object', function (t) {
	plop.setGenerator('one', {});
	plop.setGenerator('two', {});
	plop.setGenerator('three', {});

	const list = plop.getGeneratorList().map(g => g.name);

	t.true(list.includes('one'));
	t.true(list.includes('two'));
	t.true(list.includes('three'));
	t.false(list.includes('four'));
});
