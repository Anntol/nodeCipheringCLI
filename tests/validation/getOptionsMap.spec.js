import { getOptionsMap } from '../../my_ciphering_cli/validation/getOptionsMap.js'
import CustomError from '../../my_ciphering_cli/CustomError.js'

describe("GetOptionsMap", () =>{
    test("should throw error if option is duplicated", () => {
        expect(() => getOptionsMap('-c C1-C1-A-R0 -c C0')).toThrow(CustomError);
        expect(() => getOptionsMap('-c C1-C1-A-R0 -c C0')).toThrow('Option is duplicated!');
    });
});
