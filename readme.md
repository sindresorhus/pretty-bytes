# pretty-bytes [![Build Status](https://travis-ci.org/sindresorhus/pretty-bytes.svg?branch=master)](https://travis-ci.org/sindresorhus/pretty-bytes)

> Convert bytes to a human readable string: `1337` → `1.34 kB`

Useful for displaying file sizes for humans.


## Install

```
$ npm install --save pretty-bytes
```


## Usage

```js
var prettyBytes = require('pretty-bytes');

prettyBytes(1337);
//=> '1.34 kB'

prettyBytes(100);
//=> '100 B'

var base = 1024;
prettyBytes(2048, base);
//=> '2 kB'
```


## CLI

```
$ npm install --global pretty-bytes
```

```
$ pretty-bytes --help

  Usage
    $ pretty-bytes <number>
    $ echo <number> | pretty-bytes

  Example
    $ pretty-bytes 1337
    1.34 kB
```


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
