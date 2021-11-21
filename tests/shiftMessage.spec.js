import { shiftMessage } from '../my_ciphering_cli/shiftMessage.js';

describe("Shift message", () => {
    test("should shift English lowercase letters", () => {
        expect(shiftMessage('abc', 1)).toBe('bcd');
        expect(shiftMessage('abc', -1)).toBe('zab');
        expect(shiftMessage('abc', 8)).toBe('ijk');
        expect(shiftMessage('abc', -8)).toBe('stu');
    });

    test("should shift English uppercase letters", () => {
        expect(shiftMessage('ABC', 1)).toBe('BCD');
        expect(shiftMessage('ABC', -1)).toBe('ZAB');
        expect(shiftMessage('ABC', 8)).toBe('IJK');
        expect(shiftMessage('ABC', -8)).toBe('STU');
    });

    test("should not change characters other then English alphabet", () => {
        expect(shiftMessage('123 АбВ!', 1)).toBe('123 АбВ!');
    });
});
