# pretty-bytes [![Build Status](https://travis-ci.org/sindresorhus/pretty-bytes.svg?branch=master)](https://travis-ci.org/sindresorhus/pretty-bytes)

> Convert bytes to a human readable string: `1337` → `1.34 kB`

Useful for displaying file sizes for humans.

*Note that it uses base-10 (e.g. kilobyte).  
[Read about the difference between kilobyte and kibibyte.](https://web.archive.org/web/20150324153922/https://pacoup.com/2009/05/26/kb-kb-kib-whats-up-with-that/)*


## Install

```
$ npm install --save pretty-bytes
```


## Usage

```js
const prettyBytes = require('pretty-bytes');

prettyBytes(1337);
//=> '1.34 kB'

prettyBytes(100);
//=> '100 B'

// Localize output using german locale
prettyBytes(1337, { locale: 'de' });
//=> '1,34 kB'
```

## API
### prettyBytes(input, [options])
#### input
Type: `number`

The number to format.

#### options
##### locale
Type: `boolean || string`
Default: `false` / no localization

- `string`: Expects a [BCP 47 language tag](https://en.wikipedia.org/wiki/IETF_language_tag) (e.g. `en`, `de`, ...)
- `boolean`: If `true`: Localize the output using the system/browser locale.

**Note:** Localization should generally work in browsers. Node-Users have to ensure, there Node version has [full ICU-Support](https://github.com/nodejs/node/wiki/Intl):
- if your using linux, node should be able to link to the installed system-icu automatically
- or you install the [full-icu-package](https://github.com/unicode-org/full-icu-npm) and set the environment variable [NODE-ICU-DATA](https://github.com/nodejs/node/wiki/Intl#using-and-customizing-the-small-icu-build) to `node_modules/full-icu`

## Related

- [pretty-bytes-cli](https://github.com/sindresorhus/pretty-bytes-cli) - CLI for this module


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
