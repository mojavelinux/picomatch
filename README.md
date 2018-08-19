# picomatch [![NPM version](https://img.shields.io/npm/v/picomatch.svg?style=flat)](https://www.npmjs.com/package/picomatch) [![NPM monthly downloads](https://img.shields.io/npm/dm/picomatch.svg?style=flat)](https://npmjs.org/package/picomatch) [![NPM total downloads](https://img.shields.io/npm/dt/picomatch.svg?style=flat)](https://npmjs.org/package/picomatch) [![Linux Build Status](https://img.shields.io/travis/folder/picomatch.svg?style=flat&label=Travis)](https://travis-ci.org/folder/picomatch)

> Tiny, minimalist glob matching library written in JavaScript.

Please consider following this project's author, [Jon Schlinkert](https://github.com/jonschlinkert), and consider starring the project to show your :heart: and support.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save picomatch
```

## Features

The fastest, most accurate glob matcher written JavaScript, with no dependencies and full support for standard and extended Bash glob features, including braces, POSIX brackets, and advanced regex features. Picomatch loads faster, runs faster and matches faster than every other matching library, without [sacrificing quality](#sacrificing quality).

including the following "metacharacters": `*`, `**`, `?` and `[...]`.

* No dependencies
* Extremely fast! Loads faster, and parses faster, and matches faster than every other matching library we tested against.
* Wildcard matching, with `*` and `?`
* Globstar matching, with `**`
* [Advanced globbing](#extended-globbing), with extglobs, braces, and POSIX brackets!

## Usage

```js
const pm = require('picomatch');
```

## Basic globbing

| **Character** | **Description** | 
| --- | --- |
| `*` | Matches any character zero or more times, except for `/` |
| `**` | Matches any character zero or more times, including `/` |
| `?` | Matches any character except for `/` one time |
| `[abc]` | Matches any characters inside the brackets. For example, `[abc]` would match the characters `a`, `b` or `c`, and nothing else. |

**Notes**

* `*` typically does not match [hidden files]<sup class="footnote-ref"><a href="#fn1" id="fnref1">[1]</a></sup> unless explicitly enabled by the user [via options](#common-options)
* `?` also typically does not match the leading dot
* More than two stars in a glob path segment are typically interpreted as _a single star_ (e.g. `/***/` is the same as `/*/`)

## Matching special characters as literals

If you wish to match the following special characters in a filepath, and you want to use these characters in your glob pattern, they must be escaped with backslashes or quotes:

**Special Characters**

Some characters that are used for matching in regular expressions are also regarded as valid file path characters on some platforms.

To match any of the following characters as literals: `$^*+?()[]

Examples:

```js
console.log(pm.makeRe('foo/bar \\(1\\)'));
console.log(pm.makeRe('foo/bar \\(1\\)'));
```

## Options

| **Option** | **Type** | **Default value** | **Description** | 
| --- | --- | --- | --- |
| `bash` | `boolean` | `false` | Make matching behavior more similar to bash. |
| `dot` | `boolean` | `false` | Enable dotfile matching. |
| `expandBrace` | `function` | `undefined` | Function to be called on brace patterns, as an alternative to the built-in functionality. The function receives the entire brace pattern including the enclosing braces as its only argument, and it must return a string to be used in the generated regex. |
| `expandRange` | `function` | `undefined` | Custom function for expanding ranges in brace patterns, such as `{a..z}`. The function receives the range values as two arguments, and it must return a string to be used in the generated regex. It's recommended that returned strings be wrapped in parentheses. This option is overridden by the `braces` option. |
| `failglob` | `boolean` | `false` | Throws an error if no matches are found. Based on the bash option of the same name. |
| `flags` | `boolean` | `undefined` | Regex flags to use in the generated regex. If defined, the `nocase` option will be overridden. |
| `ignore` | `array | string` | `undefined` | One or more patterns |
| `keepQuotes` | `boolean` | `false` |  |
| `lookbehinds` | `boolean` | `true` | Support regex positive and negative lookbehinds. Note that your version of node.js must also support regex lookbehinds. |
| `maxLength` | `boolean` | `65536` | Maximimum length of the input string. An error is thrown if the input string is longer than this value. |
| `nocase` | `boolean` | `false` | Make globs case-insensitive. Equivalent to the regex `i` flag, this option is overridden by the `flags` option. |
| `noextglob` | `boolean` | `false` | Disable [extglobs](#extglobs) |
| `noglobstar` | `boolean` | `false` | Disable [globstar](#globstar) support. |
| `nonegate` | `boolean` | `false` |  |
| `nonull` | `boolean` | `undefined` |  |
| `normalize` | `boolean` | `undefined` | Normalize returned paths to remove leading `./` |
| `noquantifiers` | `boolean` | `undefined` | Disable support for regex quantifiers (like `a{1,2}`) and treat them as brace patterns to be expanded. |
| `nounique` | `boolean` | `undefined` | Allow duplicates in the array of returned matches. |
| `nullglob` | `boolean` | `undefined` |  |
| `onMatch` | `function` | `undefined` | Function is called on matching strings. |
| `prepend` | `boolean` | `undefined` |  |
| `strictErrors` | `boolean` | `undefined` |  |
| `strictSlashes` | `boolean` | `undefined` | Strictly enforce leading and trailing slashes. |
| `unescape` | `boolean` | `undefined` | By default, backslashes are retained Remove backslashes preceding escaped characters. |
| `unixify` | `boolean` | `undefined` | Convert all slashes in the list to match (not in the glob pattern itself) to forward slashes. |

| `**` | When two consecutive stars, or "globstars" as defined by bash, are the only thing in a path segment.

| **Option name** | **Description** | 
| --- | --- |
| `noextglob` | Disable extglobs. In addition to the traditional globs (using wildcards: `*`, `**`, `?` and `[...]`), extended globs add (almost) the expressive power of regular expressions, allowing the use of patterns like `foo/!(bar)*` |
| `dot` | Match paths beginning with `.`, or where `.` directly follows a path separator, as in `foo/.gitignore`. This option is automatically enabled if the glob pattern begins with a dot. |
| `failglob` | Throws an error when no matches are found. |
| `ignore` | Allows you to specify one or more patterns that should not be matched. |
| `noglobstar` | Recursively match directory paths (enabled by default in [minimatch](https://github.com/isaacs/minimatch) and [micromatch](https://github.com/micromatch/micromatch), but not in [bash](https://github.com/felixge/node-bash)) |
| `nocase` | Perform case-insensitive matching |
| `nullglob` | When enabled, the pattern itself will be returned when no matches are found. Aliases: `nonull` (supported by: [minimatch](https://github.com/isaacs/minimatch), [micromatch](https://github.com/micromatch/micromatch)) |

| `dot`       | Allow patterns to match filenames starting with a period, even if the pattern does not explicitly have a period in that spot. Note that by default, `a/**/b` will **not** match `a/.d/b`, unless `dot` is set. |
| `matchBase` | If set, then patterns without slashes will be matched against the basename of the path if it contains slashes.  For example, `a?b` would match the path `/xyz/123/acb`, but not `/xyz/acb/123`. |
| `nobrace`   | Do not expand `{a,b}` and `{1..3}` brace sets. |
| `nocase`    | Perform a case-insensitive match. |
| `noext`     | Disable "extglob" style patterns like `+(a|b)`. |
| `noglobstar`| Disable `**` matching against multiple folder names. |
| `nonegate`  | Suppress the behavior of treating a leading `!` character as negation. |
| `nonull`    | When a match is not found by `minimatch.match`, return a list containing the pattern itself if this option is set.  When not set, an empty list is returned if there are no matches. |

## options.toRange

**Type**: `function`

**Default**: `undefine`

Custom function for expanding ranges in brace patterns. The [fill-range](https://github.com/jonschlinkert/fill-range) library is ideal for this purpose, or you can use custom code to do whatever you need.

**Example**

The following example shows how to create a glob that matches a folder

```js
const fill = require('fill-range');
const regex = pm.makeRe('foo/{1..25}', {
  toRange(a, b) {
    return `(${fill(a, b, { toRegex: true })})`;
  }
});

console.log(regex);
//=> /^(?:foo\/([1-9]|1[0-9]|2[0-5])(?:\/|$))$/

console.log(regex.test('foo/0'))  // false
console.log(regex.test('foo/1'))  // true
console.log(regex.test('foo/10')) // true
console.log(regex.test('foo/22')) // true
console.log(regex.test('foo/25')) // true
console.log(regex.test('foo/26')) // false
```

## API

**Params**

* `glob` **{String}**
* `options` **{Object}**
* `returns` **{Object}**: Returns an object with useful properties and output to be used as regex source string.

**Example**

```js
const pm = require('picomatch');
const state = pm(pattern[, options]);
```

### [.isMatch](index.js#L636)

Returns true if **any** of the given glob `patterns` match the specified `string`.

**Params**

* **{String|Array}**: str The string to test.
* **{String|Array}**: patterns One or more glob patterns to use for matching.
* **{Object}**: See available [options](#options).
* `returns` **{Boolean}**: Returns true if any patterns match `str`

**Example**

```js
const pm = require('picomatch');
pm.isMatch(string, patterns[, options]);

console.log(pm.isMatch('a.a', ['b.*', '*.a'])); //=> true
console.log(pm.isMatch('a.a', 'b.*')); //=> false
```

### [.matcher](index.js#L659)

Returns a matcher function from the given glob `pattern` and `options`. The returned function takes a string to match as its only argument and returns true if the string is a match.

**Params**

* `pattern` **{String}**: Glob pattern
* `options` **{Object}**
* `returns` **{Function}**: Returns a matcher function.

**Example**

```js
const pm = require('picomatch');
pm.matcher(pattern[, options]);

const isMatch = pm.matcher('*.!(*a)');
console.log(isMatch('a.a')); //=> false
console.log(isMatch('a.b')); //=> true
```

**Params**

* `pattern` **{String}**: A glob pattern to convert to regex.
* `options` **{Object}**
* `returns` **{RegExp}**: Returns a regex created from the given pattern.

**Example**

```js
const pm = require('picomatch');
pm.makeRe(pattern[, options]);

console.log(pm.makeRe('*.js'));
//=> /^(?:(\.[\\\/])?(?!\.)(?=.)[^\/]*?\.js)$/
```

### [.scan](index.js#L733)

Quickly scans a glob pattern and returns an object with a handful of useful properties, like `isGlob`, `path` (the leading non-glob, if it exists), `glob` (the actual pattern), and `negated` (true if the path starts with `!`).

**Params**

* `str` **{String}**
* `options` **{Object}**
* `returns` **{Object}**: Returns an object with tokens and regex source string.

**Example**

```js
const pm = require('picomatch');
console.log(pm.scan('foo/bar/*.js'));
{ isGlob: true, input: 'foo/bar/*.js', path: 'foo/bar', parts: [ 'foo', 'bar' ], glob: '*.js' }
```

## Advanced globbing

Picomatch supports extended globbing by default, with the exception of [POSIX brackets](#posix-brackets), which must be enabled first.

* [Advanced regex](#Advanced regex) feature support, including [lookbehinds](TODO) (requires Node.js v10+)!
* [Braces](#extglobs) support (basic)
* [Extglob](#extglobs) support
* [POSIX bracket](#posix-brackets) support

### Advanced regex features

**Lookbehinds**

### Extglobs

| **Pattern** | **Description** |
| --- | --- | --- |
| `@(pattern)` | Match _only one_ consecutive occurrence of `pattern` |
| `*(pattern)` | Match _zero or more_ consecutive occurrences of `pattern` |
| `+(pattern)` | Match _one or more_ consecutive occurrences of `pattern` |
| `?(pattern)` | Match _zero or **one**_ consecutive occurrences of `pattern` |
| `!(pattern)` | Match _anything but_ `pattern` |

**Examples**

```js
const pm = require('picomatch');

// *(pattern) matches ZERO or more of "pattern"
console.log(pm.isMatch('a', 'a*(z)')); // true
console.log(pm.isMatch('az', 'a*(z)')); // true
console.log(pm.isMatch('azzz', 'a*(z)')); // true

// +(pattern) matches ONE or more of "pattern"
console.log(pm.isMatch('a', 'a*(z)')); // true
console.log(pm.isMatch('az', 'a*(z)')); // true
console.log(pm.isMatch('azzz', 'a*(z)')); // true

// supports multiple extglobs
console.log(pm.isMatch('moo.cow', '!(moo).!(cow)')); // false
console.log(pm.isMatch('foo.cow', '!(moo).!(cow)')); // false
console.log(pm.isMatch('moo.bar', '!(moo).!(cow)')); // false
console.log(pm.isMatch('foo.bar', '!(moo).!(cow)')); // true

// supports nested extglobs 
console.log(pm.isMatch('moo.cow', '!(!(moo)).!(!(cow))')); // true
```

**Disable extglob support**

```js

```

See the [Bash Reference Manual](https://www.gnu.org/software/bash/manual/html_node/Pattern-Matching.html) for more information.

### POSIX brackets

POSIX classes are disabled by default. Enable this feature by setting the `posix` option to true.

**Enable POSIX bracket support**

```js
console.log(pm.makeRe('[[:word:]]+', { posix: true }));
//=> /^(?:(?=.)[A-Za-z0-9_]+\/?)$/
```

**Supported classes**

The following named POSIX bracket expressions are supported:

* `[:alnum:]` - Alphanumeric characters, equ `[a-zA-Z0-9]`
* `[:alpha:]` - Alphabetical characters, equivalent to `[a-zA-Z]`.
* `[:ascii:]` - ASCII characters, equivalent to `[\\x00-\\x7F]`.
* `[:blank:]` - Space and tab characters, equivalent to `[ \\t]`.
* `[:cntrl:]` - Control characters, equivalent to `[\\x00-\\x1F\\x7F]`.
* `[:digit:]` - Numerical digits, equivalent to `[0-9]`.
* `[:graph:]` - Graph characters, equivalent to `[\\x21-\\x7E]`.
* `[:lower:]` - Lowercase letters, equivalent to `[a-z]`.
* `[:print:]` - Print characters, equivalent to `[\\x20-\\x7E ]`.
* `[:punct:]` - Punctuation and symbols, equivalent to `[\\-!"#$%&\'()\\*+,./:;<=>?@[\\]^_`{|}~]`.
* `[:space:]` - Extended space characters, equivalent to `[ \\t\\r\\n\\v\\f]`.
* `[:upper:]` - Uppercase letters, equivalent to `[A-Z]`.
* `[:word:]` -  Word characters (letters, numbers and underscores), equivalent to `[A-Za-z0-9_]`.
* `[:xdigit:]` - Hexadecimal digits, equivalent to `[A-Fa-f0-9]`.

See the [Bash Reference Manual](https://www.gnu.org/software/bash/manual/html_node/Pattern-Matching.html) for more information.

## Picomatch performance

### Load time

* minimatch: `5.466ms`
* picomatch: `1.447ms`

## Matching behavior

Picomatch's matching features and expected results in unit tests are based on Bash's unit tests and the Bash 4.3 specification, with the following exceptions:

* Bash will match `foo/bar/baz` with `*`. Picomatch only matches nested directories with `**`.
* Bash greedily matches with negated extglobs. For example, Bash 4.3 says that `!(foo)*` should match `foo` and `foobar`, since the trailing `*` bracktracks to match the preceding pattern. This is very memory-inefficient, and IMHO, also incorrect. Picomatch would return `false` for both `foo` and `foobar`.

## Comparison to other libraries

| **Library** | **Tests passed** | **Tests failed** |

### picomatch (the baseline)

```
1576 passing (445ms)
```

### globrex

globrex was so innacurate at matching that we decided to leave it out of the benchmarks.

```
814 passing (535ms)
762 failing
```

## About

<details>
<summary><strong>Contributing</strong></summary>

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

Please read the [contributing guide](.github/contributing.md) for advice on opening issues, pull requests, and coding standards.

</details>

<details>
<summary><strong>Running Tests</strong></summary>

Running and reviewing unit tests is a great way to get familiarized with a library and its API. You can install dependencies and run tests with the following command:

```sh
$ npm install && npm test
```

</details>

<details>
<summary><strong>Building docs</strong></summary>

_(This project's readme.md is generated by [verb](https://github.com/verbose/verb-generate-readme), please don't edit the readme directly. Any changes to the readme must be made in the [.verb.md](.verb.md) readme template.)_

To generate the readme, run the following command:

```sh
$ npm install -g verbose/verb#dev verb-generate-readme && verb
```

</details>

### Author

**Jon Schlinkert**

* [GitHub Profile](https://github.com/jonschlinkert)
* [Twitter Profile](https://twitter.com/jonschlinkert)
* [LinkedIn Profile](https://linkedin.com/in/jonschlinkert)

### License

Copyright © 2018, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT License](LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.6.0, on August 11, 2018._

<hr class="footnotes-sep">
<section class="footnotes">
<ol class="footnotes-list">
<li id="fn1"  class="footnote-item">Also known as _dotfiles_ file names starting with a dot. See the <a href= ""https://en.wikipedia.org/wiki/Hidden_file_and_hidden_directory">hidden files and directories wiki</a> for more information." <a href="#fnref1" class="footnote-backref">↩</a>

</li>
</ol>
</section>