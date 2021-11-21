import { checkConfigValidation } from '../../my_ciphering_cli/validation/checkConfigValidation.js'
import CustomError from '../../my_ciphering_cli/CustomError.js'

describe("CheckConfigValidation", () =>{
    test("should throw error if no config provided", () => {
        expect(() => checkConfigValidation()).toThrow(CustomError);
        expect(() => checkConfigValidation()).toThrow('Config option is required!');
    });

    test("should throw error when config value is invalid", () => {
        expect(() => checkConfigValidation('C0-C2')).toThrow(CustomError);
        expect(() => checkConfigValidation('C1-A1')).toThrow('Invalid config value A1!');
    });
})