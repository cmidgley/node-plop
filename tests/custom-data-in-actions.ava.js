// import fs from 'fs';
import * as fspp from '../src/fs-promise-proxy.js';
import path from 'path';
import AvaTest from './_base-ava-test.js';
import {fileURLToPath} from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const {test, mockPath, testSrcPath, nodePlop} = (new AvaTest(__filename));

var plop;
var customData;
test.before(async () => {
	plop = await nodePlop(`${mockPath}/plopfile.js`);
	customData = plop.getGenerator('custom-data-in-actions');
});

test('Check that custom data is in template', async function (t) {
	await customData.runActions({});
	const file = path.resolve(testSrcPath, 'Frodo-loves-who.txt');
	const content = await fspp.readFile(file);
	t.is(content, 'Frodo loves Gandalf');
});

test('Check that data is overridden', async function (t) {
	await customData.runActions({name: 'Sauron'});
	const filePath = path.resolve(testSrcPath, 'Sauron-loves-who.txt');
	const greetSubjectPath = path.resolve(testSrcPath, 'hola-world.txt');

	t.is(await fspp.readFile(filePath), 'Sauron loves Gandalf');
	t.true(await fspp.fileExists(greetSubjectPath));
});
