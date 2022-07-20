import { genDiff } from '../src/utils.js';
import path from 'path';
import fs from 'fs';

const pathOfInitialFile = '__fixtures__/file1.json';
const pathOfChangedFile = '__fixtures__/file2.json';
const expected = fs.readFileSync(path.resolve('__fixtures__/result.txt'), { encoding: 'utf8', flag: 'r' });
const received = genDiff(pathOfInitialFile, pathOfChangedFile);

test('genDiff', () => {
    expect(received).toBe(expected);
});

