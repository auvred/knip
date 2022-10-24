import test from 'node:test';
import assert from 'node:assert/strict';
import { main } from '../src';
import baseArguments from './fixtures/baseArguments';

test('Find unused files and exports with JS entry file', async () => {
  const workingDir = 'test/fixtures/entry-js';

  const { issues, counters } = await main({
    ...baseArguments,
    cwd: workingDir,
    workingDir,
  });

  assert.equal(issues.files.size, 1);
  assert(Array.from(issues.files)[0].endsWith('dangling.js'));

  assert.equal(Object.values(issues.exports).length, 1);
  assert.equal(issues.exports['dep.ts']['unused'].symbol, 'unused');

  assert.equal(Object.values(issues.types).length, 1);
  assert.equal(issues.types['dep.ts']['Dep'].symbolType, 'type');

  assert.equal(Object.values(issues.nsExports).length, 1);
  assert.equal(issues.nsExports['ns.ts']['z'].symbol, 'z');

  assert.equal(Object.values(issues.nsTypes).length, 1);
  assert.equal(issues.nsTypes['ns.ts']['NS'].symbol, 'NS');

  assert.equal(Object.values(issues.duplicates).length, 1);
  assert.equal(issues.duplicates['dep.ts']['dep|default'].symbols?.[0], 'dep');

  assert.deepEqual(counters, {
    dependencies: 0,
    devDependencies: 0,
    duplicates: 1,
    exports: 1,
    files: 1,
    nsExports: 1,
    nsTypes: 1,
    processed: 4,
    total: 4,
    types: 1,
    unlisted: 0,
  });
});
