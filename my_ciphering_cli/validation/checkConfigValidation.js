import CustomError from '../CustomError.js';

export function checkConfigValidation(ciphers) {
    if (!ciphers) {
        throw new CustomError('Config option is required!');
    }

    const allowedCipherValues = ['C0','C1','R0','R1','A'];
    ciphers.split('-').forEach(cipher => {
        if (!allowedCipherValues.includes(cipher)) {
            throw new CustomError(`Invalid config value ${ cipher }!`);
        }
    });
}