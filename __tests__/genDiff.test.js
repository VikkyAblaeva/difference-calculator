import path from 'path';
import fs from 'fs';
import { test, expect } from '@jest/globals';
import genDiff from '../src/main.js';

const expectedStylishTest = fs.readFileSync(path.resolve('./__fixtures__/stylishResult.txt'), { encoding: 'utf8', flag: 'r' });
const expectedPlainTest = fs.readFileSync(path.resolve('./__fixtures__/plainResult.txt'), { encoding: 'utf8', flag: 'r' });
const expectedJsonTest = fs.readFileSync(path.resolve('./__fixtures__/jsonResult.txt'), { encoding: 'utf8', flag: 'r' });
const formaters = ['stylish', 'plain', 'json'];

describe.each([
  ['__fixtures__/file1.json', '__fixtures__/file2.yml', expectedStylishTest],
  ['__fixtures__/file1.json', '__fixtures__/file2.yml', expectedPlainTest],
  ['__fixtures__/file1.json', '__fixtures__/file2.yml', expectedJsonTest],
])('.add(%o, %o)', (fileBefore, fileAfter, expected) => {
  test(`genDiffFormatersTest ${expected}`, () => {
    expect(genDiff(fileBefore, fileAfter, formaters[0])).toBe(expectedStylishTest);
    expect(genDiff(fileBefore, fileAfter, formaters[1])).toBe(expectedPlainTest);
    expect(genDiff(fileBefore, fileAfter, formaters[2])).toBe(expectedJsonTest);
  });
});
