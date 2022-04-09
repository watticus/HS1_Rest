const { TestWatcher } = require('jest')
const convertCsv = require('../lib/convertCsv')

describe('Test Handlers', () => {

    test('Splits CSV into Array', () => {
        testString1 = '"Patient Name","SSN","Age","Phone Number","Status"';
        testString2 = '"Prescott, Zeke","542-51-6641",21,"801-555-2134","Opratory=2,PCP=1"';
        testString3 = '"Goldstein, Bucky","635-45-1254",42,"435-555-1541","Opratory=1,PCP=1"';
        testString4 = '"Vox, Bono","414-45-1475",51,"801-555-2100","Opratory=3,PCP=2"';
        testString5 = '"Tutone, Tommy",,81,"801.867.5309","Opratory=11,PCP=-1"';

        expect(convertCsv.convertCsv(testString1)).toBe('[Patient Name] [SSN] [Age] [Phone Number] [Status]');
        expect(convertCsv.convertCsv(testString2)).toBe('[Prescott, Zeke] [542-51-6641] [21] [801-555-2134] [Opratory=2,PCP=1]');
        expect(convertCsv.convertCsv(testString3)).toBe('[Goldstein, Bucky] [635-45-1254] [42] [435-555-1541] [Opratory=1,PCP=1]');
        expect(convertCsv.convertCsv(testString4)).toBe('[Vox, Bono] [414-45-1475] [51] [801-555-2100] [Opratory=3,PCP=2]');
        expect(convertCsv.convertCsv(testString5)).toBe('[Tutone, Tommy] [] [81] [801.867.5309] [Opratory=11,PCP=-1]');
    });
});