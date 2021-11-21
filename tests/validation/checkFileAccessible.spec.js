import { checkFileAccessible } from '../../my_ciphering_cli/validation/checkFileAccessible.js'
import CustomError from '../../my_ciphering_cli/CustomError.js'

describe("CheckFileAccessible", () =>{
    test("should throw error if path that doesn't exist", () => {
        expect(() => checkFileAccessible('./files/nofile.txt')).toThrow(CustomError);
    });
})