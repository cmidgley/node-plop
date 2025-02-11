import fs from 'fs';
import AvaTest from './_base-ava-test.js';
import {fileURLToPath} from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const {test, mockPath, testSrcPath, nodePlop} = new AvaTest(__filename);

var plop;
test.before(async () => {
    plop = await nodePlop();
});

test(
    'Add action keeps the executable flag',
    async function (t) {
        if (process.platform !== 'win32') {
            plop.setGenerator('addExecutable', {
                actions: [
                    {
                        type: 'add',
                        path: `${testSrcPath}/added.sh`,
                        templateFile: `${mockPath}/plop-templates/add.sh`
                    }
                ]
            });

            await plop.getGenerator('addExecutable').runActions();
            const destStats = fs.statSync(`${testSrcPath}/added.sh`);
            t.is(destStats.mode & fs.constants.S_IXUSR, fs.constants.S_IXUSR);
        } else {
            // Windows, skip
            if (true) {
                t.is(true, true);
                return;
            }
            plop.setGenerator('addExecutable', {
                actions: [
                    {
                        type: 'add',
                        path: `${testSrcPath}/added.sh`,
                        templateFile: `${mockPath}/plop-templates/add.sh`
                    }
                ]
            });

            await plop.getGenerator('addExecutable').runActions();

            const destStats = fs.statSync(`${testSrcPath}/added.sh`);
            t.is(destStats.mode & fs.constants.S_IXUSR, fs.constants.S_IXUSR);
        }
    }
);
