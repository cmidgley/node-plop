import fs from 'fs';
import AvaTest from './_base-ava-test.js';
import {fileURLToPath} from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const {test, mockPath, testSrcPath, nodePlop} = (new AvaTest(__filename));

var plop;
test.before(async () => {
	plop = await nodePlop(`${mockPath}/sub/plopfile.js`);
});

// chdir doesn't like to work in modern versions of ava (or many other test frameworks)
// EG: process.chdir() is not supported in workers
// We should rewrite this test
test.skip('Force del outside cwd test', async function (t) {
	process.chdir(`${mockPath}/sub`);
	fs.mkdirSync(testSrcPath);
	fs.writeFileSync(testSrcPath + '/test.txt', 'init content');
	const testGen = plop.getGenerator('test');
	const {changes} = await testGen.runActions();
	const content = fs.readFileSync(testSrcPath + '/test.txt', 'utf8');
	t.is(changes.length, 1);
	t.is(content, 'test content');
});
