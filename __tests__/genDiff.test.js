import path from 'path';
import fs from 'fs';
import { test, expect } from '@jest/globals';
import { genDiff } from '../src/utils.js';

const pathOfInitialFileJson = '__fixtures__/file1.json';
const pathOfChangedFileJson = '__fixtures__/file2.json';
const expectedForJsonTest = fs.readFileSync(path.resolve('__tests__/__fixtures__/result.txt'), { encoding: 'utf8', flag: 'r' });
const receivedForJsonTest = genDiff(pathOfInitialFileJson, pathOfChangedFileJson);

test('genDiffJson', () => {
  expect(receivedForJsonTest).toBe(expectedForJsonTest);
});

const pathOfInitialFileYml = '__fixtures__/file1.yml';
const pathOfChangedFileYml = '__fixtures__/file2.yml';
const expectedForYmlTest = fs.readFileSync(path.resolve('__tests__/__fixtures__/result.txt'), { encoding: 'utf8', flag: 'r' });
const receivedForYmlTest = genDiff(pathOfInitialFileYml, pathOfChangedFileYml);

test('genDiffYml', () => {
  expect(receivedForYmlTest).toBe(expectedForYmlTest);
});
