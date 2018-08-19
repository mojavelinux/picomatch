'use strict';

require('mocha');
const assert = require('assert');
const pm = require('..');

const equal = (actual, expected, msg) => {
  if (Array.isArray(actual)) actual.sort();
  if (Array.isArray(expected)) expected.sort();
  assert.deepEqual(actual, expected, msg);
};

const match = (list, pattern, options = {}) => {
  let isMatch = pm(pattern, options);
  let matches = new Set();
  for (let ele of list) {
    if (isMatch(ele)) {
      matches.add(options.onMatch ? options.onMatch(ele) : ele);
    }
  }
  return [...matches];
};

describe('options.prepend', () => {
  beforeEach(() => pm.clearCache());

  it('should match leading "./" based on the value defined on options.prepend', () => {
    const opts = { prepend: '(\\.\\/(?=.))?' };
    const fixtures = ['a', './a', 'b', 'a/a', './a/b', 'a/c', './a/x', './a/a/a', 'a/a/b', './a/a/a/a', './a/a/a/a/a', 'x/y', './z/z'];

    assert(!pm.isMatch('./.a', '*.a', opts));
    assert(!pm.isMatch('./.a', './*.a', opts));
    assert(!pm.isMatch('./.a', 'a/**/z/*.md', opts));
    assert(!pm.isMatch('./a/b/c/d/e/z/c.md', './a/**/j/**/z/*.md', opts));
    assert(!pm.isMatch('./a/b/c/j/e/z/c.txt', './a/**/j/**/z/*.md', opts));
    assert(!pm.isMatch('a/b/c/d/e/z/c.md', './a/**/j/**/z/*.md', opts));
    assert(pm.isMatch('./.a', './.a', opts));
    assert(pm.isMatch('./a/b/c.md', 'a/**/*.md', opts));
    assert(pm.isMatch('./a/b/c/d/e/j/n/p/o/z/c.md', './a/**/j/**/z/*.md', opts));
    assert(pm.isMatch('./a/b/c/d/e/z/c.md', '**/*.md', opts));
    assert(pm.isMatch('./a/b/c/d/e/z/c.md', './a/**/z/*.md', opts));
    assert(pm.isMatch('./a/b/c/d/e/z/c.md', 'a/**/z/*.md', opts));
    assert(pm.isMatch('./a/b/c/j/e/z/c.md', './a/**/j/**/z/*.md', opts));
    assert(pm.isMatch('./a/b/c/j/e/z/c.md', 'a/**/j/**/z/*.md', opts));
    assert(pm.isMatch('./a/b/z/.a', './a/**/z/.a', opts));
    assert(pm.isMatch('./a/b/z/.a', 'a/**/z/.a', opts));
    assert(pm.isMatch('.a', './.a', opts));
    assert(pm.isMatch('a/b/c.md', './a/**/*.md', opts));
    assert(pm.isMatch('a/b/c.md', 'a/**/*.md', opts));
    assert(pm.isMatch('a/b/c/d/e/z/c.md', 'a/**/z/*.md', opts));
    assert(pm.isMatch('a/b/c/j/e/z/c.md', 'a/**/j/**/z/*.md', opts));
    assert(pm.isMatch('./a', '*', opts));

    /**
     * HEADS UP! DON'T CONVERT THESE TESTS TO USE .isMatch, since
     * they test for the return values, not just truthiness.
     */

    equal(match(fixtures, '*', opts), ['./a', 'a', 'b']);
    equal(match(fixtures, '**/a/**', opts), ['a/a', 'a/c', './a/b', './a/x', './a/a/a', 'a/a/b', './a/a/a/a', './a/a/a/a/a']);
    equal(match(fixtures, '*/*', opts), ['a/a', './a/b', 'a/c', './a/x', 'x/y', './z/z']);
    equal(match(fixtures, '*/*/*', opts), ['./a/a/a', 'a/a/b']);
    equal(match(fixtures, '*/*/*/*', opts), ['./a/a/a/a']);
    equal(match(fixtures, '*/*/*/*/*', opts), ['./a/a/a/a/a']);
    equal(match(fixtures, './*', opts), ['./a', 'a', 'b']);
    equal(match(fixtures, './**/a/**', opts), ['a/a', 'a/c', './a/b', './a/x', './a/a/a', 'a/a/b', './a/a/a/a', './a/a/a/a/a']);
    equal(match(fixtures, './a/*/a', opts), ['./a/a/a']);
    equal(match(fixtures, 'a/*', opts), ['a/a', './a/b', 'a/c', './a/x']);
    equal(match(fixtures, 'a/*/*', opts), ['./a/a/a', 'a/a/b']);
    equal(match(fixtures, 'a/*/*/*', opts), ['./a/a/a/a']);
    equal(match(fixtures, 'a/*/*/*/*', opts), ['./a/a/a/a/a']);
    equal(match(fixtures, 'a/*/a', opts), ['./a/a/a']);
  });
});
