# pretty-bytes

> 将字节转换为人类可读的字符串:' 1337 '→' 1.34 kB '

用于显示人类可读的文件大小

*注意，它使用base-10(例如，kilobyte)。[了解kilobyte和kibibyte之间的差异](https://web.archive.org/web/20150324153922/https://pacoup.com/2009/05/26/kb-kb-kib-whats-up-with-that/)




## 安装

```
$ npm install pretty-bytes
```

## 使用

```js
const prettyBytes = require('pretty-bytes');

prettyBytes(1337);
//=> '1.34 kB'

prettyBytes(100);
//=> '100 B'

// 以bits为单位的显示
prettyBytes(1337, {bits: true});
//=> '1.34 kbit'

// 显示文件大小差异
prettyBytes(42, {signed: true});
//=> '+42 B'

// Localized output using German locale
prettyBytes(1337, {locale: 'de'});
//=> '1,34 kB'
```

## API

### prettyBytes(number, options?)

#### number

Type: `number`

要格式化的数字

#### options

Type: `object`

##### signed

Type: `boolean`
Default: `false`

正数包含+号，如果差值恰好为零，则将使用空格字符代替，以更好地对齐。

##### bits

Type: `boolean`
Default: `false`

将数字格式设置为[bits](https://en.wikipedia.org/wiki/Bit)而不是[bytes](https://en.wikipedia.org/wiki/Byte). 在以下情况下，这可能会很有用：例如，关于 [bit rate](https://en.wikipedia.org/wiki/Bit_rate).

##### binary

Type: `boolean`
Default: `false`

使用[二进制前缀](https://en.wikipedia.org/wiki/Binary_prefix)而不是[SI前缀](https://en.wikipedia.org/wiki/SI_prefix)格式化数字。
这对于显示存储量可能很有用。 但是，不应将其用于显示文件大小。

##### locale

Type: `boolean | string`
Default: `false` *(没有本地化)*

**重要提示：**仅数字和小数点分隔符已本地化。 单元标题不是，也不会本地化。


- 如果 `true`: 使用系统/浏览器区域设置本地化输出。
- 如果 `string`: 需要[BCP 47语言标签](https://en.wikipedia.org/wiki/IETF_language_tag)（例如：`en`，`de`等）
- 如果 `string[]`: 需要[BCP 47语言标签](https://en.wikipedia.org/wiki/IETF_language_tag)的列表（例如："en"，"de"等）

**注意：**本地化通常应在浏览器中进行。 Node.js需要使用"full-icu"或"system-icu"来[构建](https://github.com/nodejs/node/wiki/Intl).或者，可以使用[`full-icu`](https://github.com/unicode-org/full-icu-npm)模块在运行时提供支持。 [Node.js 13](https://nodejs.org/en/blog/release/v13.0.0/)和更高版本默认情况下都附带ICU。

##### minimumFractionDigits

Type: `number`
Default: `undefined`

显示的最小小数位数。

如果未设置"minimumFractionDigits"或"maximumFractionDigits"，则默认行为是四舍五入到3个有效数字。

```js
const prettyBytes = require('pretty-bytes');

//显示至少包含3个小数位的数字
prettyBytes(1900, {minimumFractionDigits: 3});
//=> '1.900 kB'

prettyBytes(1900);
//=> '1.9 kB'
```

##### maximumFractionDigits

Type: `number`
Default: `undefined`

要显示的最大小数位数。

如果未设置"minimumFractionDigits"或"maximumFractionDigits"，则默认行为是四舍五入到3个有效数字。

```js
const prettyBytes = require('pretty-bytes');

//显示最多1个小数位数的数字
prettyBytes(1920, {maximumFractionDigits: 1});
//=> '1.9 kB'

prettyBytes(1920);
//=> '1.92 kB'
```

## 相关模块

- [pretty-bytes-cli](https://github.com/sindresorhus/pretty-bytes-cli) - 次模块的cli版本
- [pretty-ms](https://github.com/sindresorhus/pretty-ms) - 将毫秒转换为人类可读的字符串
