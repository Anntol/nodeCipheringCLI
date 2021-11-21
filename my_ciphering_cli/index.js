import { pipeline } from 'stream';

import AtbashStream from './AtbashStream.js';
import CaesarStream from './CaesarStream.js';
import CustomError from './CustomError.js';
import ReadableStream from './ReadableStream.js';
import Rot8Stream from './Rot8Stream.js';
import WritableStream from './WritableStream.js';

import { checkConfigValidation } from './validation/checkConfigValidation.js';
import { checkFileAccessible } from './validation/checkFileAccessible.js';
import { getOptionsMap } from './validation/getOptionsMap.js';

try {
    const options = getOptionsMap(process.argv);

    const input = options.get('-i') ?? options.get('--input');
    checkFileAccessible(input);
    
    const output = options.get('-o') ?? options.get('--output');
    checkFileAccessible(output);

    let streams = [];
    const ciphers = options.get('-c') ?? options.get('--config');
    checkConfigValidation(ciphers);
    ciphers.split('-').forEach(cipher => {
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