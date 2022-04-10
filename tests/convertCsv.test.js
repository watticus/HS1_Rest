const { TestWatcher } = require('jest');
const convertCsv = require('../lib/convertCsv');

describe('CSV Conversion Tests', () => {

    test('Validate array returned on splitaCsv function', () => {
        testString1 = '"Patient Name","SSN","Age","Phone Number","Status"';

        expect(convertCsv.splitCsv(testString1)).toBeInstanceOf(Array);
    })

    test('Validate array returned on replaceQuotesWithBrackets function', () => {
        testArray1 = ["\"Patient Name\"", "\"SSN\"", "\"Age\"", "\"Phone Number\"", "\"Status\""]

        expect(convertCsv.replaceQuotesWithBrackets(testArray1)).toBeInstanceOf(Array)
    })

    test('Happy Path validation', () => {
        testString1 = '"Patient Name","SSN","Age","Phone Number","Status"';
        testString2 = '"Prescott, Zeke","542-51-6641",21,"801-555-2134","Opratory=2,PCP=1"';
        testString3 = '"Goldstein, Bucky","635-45-1254",42,"435-555-1541","Opratory=1,PCP=1"';
        testString4 = '"Vox, Bono","414-45-1475",51,"801-555-2100","Opratory=3,PCP=2"';
        

        expect(convertCsv.convertCsv(testString1)).toBe('[Patient Name] [SSN] [Age] [Phone Number] [Status]');
        expect(convertCsv.convertCsv(testString2)).toBe('[Prescott, Zeke] [542-51-6641] [21] [801-555-2134] [Opratory=2,PCP=1]');
        expect(convertCsv.convertCsv(testString3)).toBe('[Goldstein, Bucky] [635-45-1254] [42] [435-555-1541] [Opratory=1,PCP=1]');
        expect(convertCsv.convertCsv(testString4)).toBe('[Vox, Bono] [414-45-1475] [51] [801-555-2100] [Opratory=3,PCP=2]');
    });

    test('Empty input validation', () => {
        testString1 = '"","513-95-7520",35,"801.867.5309","Opratory=11,PCP=-1"';
        testString2 = '"Tutone, Tommy",,81,"801.867.5309","Opratory=11,PCP=-1"';
        testString3 = '"Tutone, Tommy","513-95-7520",,"801.867.5309","Opratory=11,PCP=-1"';
        testString4 = '"Tutone, Tommy","513-95-7520",81,"","Opratory=11,PCP=-1"';
        testString5 = '"Tutone, Tommy","513-95-7520",81,"801.867.5309",""';
        testString6 = '"","","","",""'
        testString7 = ',,,,'

        expect(convertCsv.convertCsv(testString1)).toBe('[] [513-95-7520] [35] [801.867.5309] [Opratory=11,PCP=-1]');
        expect(convertCsv.convertCsv(testString2)).toBe('[Tutone, Tommy] [] [81] [801.867.5309] [Opratory=11,PCP=-1]');
        expect(convertCsv.convertCsv(testString3)).toBe('[Tutone, Tommy] [513-95-7520] [] [801.867.5309] [Opratory=11,PCP=-1]');
        expect(convertCsv.convertCsv(testString4)).toBe('[Tutone, Tommy] [513-95-7520] [81] [] [Opratory=11,PCP=-1]');
        expect(convertCsv.convertCsv(testString5)).toBe('[Tutone, Tommy] [513-95-7520] [81] [801.867.5309] []');
        expect(convertCsv.convertCsv(testString6)).toBe('[] [] [] [] []');
        expect(convertCsv.convertCsv(testString7)).toBe('[] [] [] [] []');

    });
});