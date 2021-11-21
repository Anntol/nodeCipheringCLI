import CustomError from '../CustomError.js';

export function getOptionsMap(args){
    const options = new Map();
    for (let i = 2; i < args.length; i += 2) {
        const key = args[i];
        if (options.has(key)) {
            throw new CustomError('Option is duplicated!');
        }
        options.set(key, process.argv[i + 1]);
    }
    return options;
}