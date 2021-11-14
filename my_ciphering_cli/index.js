import { pipeline } from 'stream';

import AtbashStream from './AtbashStream.js';
import CaesarStream from './CaesarStream.js';
import CustomError from './CustomError.js';
import ReadableStream from './ReadableStream.js';
import Rot8Stream from './Rot8Stream.js';
import WritableStream from './WritableStream.js';
import { checkFileAccessible } from './checkFileAccessible.js';

try {
    const options = new Map();
    for (let i = 2; i < process.argv.length; i += 2) {
        const key = process.argv[i];
        if (options.has(key)) {
            throw new CustomError('Option is duplicated!');
        }
        options.set(key, process.argv[i + 1]);
    }

    const input = options.get('-i') ?? options.get('--input');
    checkFileAccessible(input);
    
    const output = options.get('-o') ?? options.get('--output');
    checkFileAccessible(output);

    let streams = [];
    const ciphers = options.get('-c') ?? options.get('--config');
    if (!ciphers) {
        throw new CustomError('Config option is required!');
    }

    const allowedCipherValues = ['C0','C1','R0','R1','A'];
    ciphers.split('-').forEach(cipher => {
        if (!allowedCipherValues.includes(cipher)) {
            throw new CustomError(`Invalid config value ${ cipher }!`);
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
        }
    });

    pipeline(
        input ? new ReadableStream(input) : process.stdin,
        ...streams,
        output ? new WritableStream(output) : process.stdout,
        (err) => {
            if (err) {
                throw new CustomError('Pipeline failed.', err);
            }
        }
    )
}
catch (e) {
    if (e.isCustom) {
        console.error(e.message);
    }
    else {
        console.error(`Unhandled exeption. ${e.message}`);
    }
    process.exit(1);
}