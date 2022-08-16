import path from 'path';
import fs from 'fs';
import { test, expect } from '@jest/globals';
import { genDiff } from '../src/utils.js';

const pathBeforeFileJson = '__fixtures__/file1.json';
const pathAfterFileJson = '__fixtures__/file2.json';
const formatNameStylish = 'stylish';
const formatNamePlain = 'plain';
const expectedJsonStylishTest = fs.readFileSync(path.resolve('__tests__/__fixtures__/stylishResult.txt'), { encoding: 'utf8', flag: 'r' });
const expectedJsonPlainTest = fs.readFileSync(path.resolve('__tests__/__fixtures__/plainResult.txt'), { encoding: 'utf8', flag: 'r' });
const receivedJsonStylishTest = genDiff(pathBeforeFileJson, pathAfterFileJson, formatNameStylish);
const receivedPlainJsonTest = genDiff(pathBeforeFileJson, pathAfterFileJson, formatNamePlain);

test('genDiffStylishJson', () => {
  expect(expectedJsonStylishTest).toBe(receivedJsonStylishTest);
});

test('genDiffPlainJson', () => {
  expect(expectedJsonPlainTest).toBe(receivedPlainJsonTest);
});

const pathBeforeFileYml = '__fixtures__/file1.yml';
const pathAfterFileYml = '__fixtures__/file2.yml';
const expectedYmlStylishTest = fs.readFileSync(path.resolve('__tests__/__fixtures__/stylishResult.txt'), { encoding: 'utf8', flag: 'r' });
const expectedYmlPlainTest = fs.readFileSync(path.resolve('__tests__/__fixtures__/plainResult.txt'), { encoding: 'utf8', flag: 'r' });
const receivedYmlStylishTest = genDiff(pathBeforeFileYml, pathAfterFileYml, formatNameStylish);
const receivedYmlPlainTest = genDiff(pathBeforeFileYml, pathAfterFileYml, formatNamePlain);

test('genDiffStylishYml', () => {
  expect(expectedYmlStylishTest).toBe(receivedYmlStylishTest);
});

test('genDiffPlainYml', () => {
  expect(expectedYmlPlainTest).toBe(receivedYmlPlainTest);
});
