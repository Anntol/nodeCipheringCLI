import { pipeline } from 'stream';

import AtbashStream from './AtbashStream.js';
import CaesarStream from './CaesarStream.js';
import ReadableStream from './ReadableStream.js';
import Rot8Stream from './Rot8Stream.js';
import WritableStream from './WritableStream.js';
import { isFileAccessible } from './isFileAccessible.js';

const options = new Map();
for (let i = 2; i < process.argv.length; i += 2) {
    const key = process.argv[i];
    if (options.has(key)) {
        console.error('Option is duplicated!');
        process.exit(1);
    }
    options.set(key, process.argv[i + 1]);
}

const input = options.get('-i') ?? options.get('--input');
const output = options.get('-o') ?? options.get('--output');
if ((!isFileAccessible(input)) || (!isFileAccessible(output))) {
    process.exit(1);
}

let streams = [];
const ciphers = options.get('-c') ?? options.get('--config');
if (!ciphers) {
    console.error('Config option is required!');
    process.exit(1);
}

const allowedCipherValues = ['C0','C1','R0','R1','A'];
ciphers.split('-').forEach(cipher => {
    if (!allowedCipherValues.includes(cipher)) {
        console.error(`Invalid config value ${ cipher }!`);
        process.exit(1);
    }
    switch (cipher[0]) {
        case 'C':
            streams.push(new CaesarStream(cipher[1]));
            break;
        case 'R':
            streams.push(new Rot8Stream(cipher[1]));
            break;
        case 'A':
            streams.push(new AtbashStream());
            break;
        default:
            console.error('Incorrect cipher mark!');
            process.exit(1);
    }
});

pipeline(
    input ? new ReadableStream(input) : process.stdin,
    ...streams,
    output ? new WritableStream(output) : process.stdout,
    (err) => {
      if (err) {
        console.error('Pipeline failed.', err);
        process.exit(1);
      }
    }
  )