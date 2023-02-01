import {expectType} from 'tsd';
import prettyBytes from './index.js';

expectType<string>(prettyBytes(1337));
expectType<string>(prettyBytes(42, {signed: true}));
expectType<string>(prettyBytes(1337, {locale: 'de'}));
expectType<string>(prettyBytes(1337, {locale: true}));
expectType<string>(prettyBytes(1337, {bits: true}));
expectType<string>(prettyBytes(1337, {binary: true}));
expectType<string>(prettyBytes(1337, {space: true}));
