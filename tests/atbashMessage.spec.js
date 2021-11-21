import { shiftMessage } from '../my_ciphering_cli/atbashMessage.js';

describe("Atbash message", () => {
    test("should map English lowercase letters to alphabet's reverse", () => {
        expect(shiftMessage('abc')).toBe('zyx');
    });

    test("should map English uppercase letters to alphabet's reverse", () => {
        expect(shiftMessage('ABC')).toBe('ZYX');
    });

    test("should not change characters other then English alphabet", () => {
        expect(shiftMessage('123 АбВ!')).toBe('123 АбВ!');
    });
});
