const parseBody = require('../lib/parseBody')

describe('Parse Body Tests', () => {

    test('Validate array returned on splitBody function by new line', () => {
        testString = '"Patient Name","SSN","Age","Phone Number","Status"' + '\n' + 
        '"Prescott, Zeke","542-51-6641",21,"801-555-2134","Opratory=2,PCP=1"'  + '\n' +
        '"Goldstein, Bucky","635-45-1254",42,"435-555-1541","Opratory=1,PCP=1"' + '\n' +
        '"Vox, Bono","414-45-1475",51,"801-555-2100","Opratory=3,PCP=2"';

        expect(parseBody.splitBody(testString)).toBeInstanceOf(Array);
        expect(parseBody.splitBody(testString).length).toBe(4);       
    })

    test('Validate array returned on convertArrayToBlockFormatString function', () => {
        testArray1 = ['"Patient Name","SSN","Age","Phone Number","Status"',
            '"Prescott, Zeke","542-51-6641",21,"801-555-2134","Opratory=2,PCP=1"',
            '"Goldstein, Bucky","635-45-1254",42,"435-555-1541","Opratory=1,PCP=1"',
            '"Vox, Bono","414-45-1475",51,"801-555-2100","Opratory=3,PCP=2"']

        expect(parseBody.convertArrayToBlockFormatString(testArray1)).toBe(
        '[Patient Name] [SSN] [Age] [Phone Number] [Status]' + '\n' +
        '[Prescott, Zeke] [542-51-6641] [21] [801-555-2134] [Opratory=2,PCP=1]' + '\n' +
        '[Goldstein, Bucky] [635-45-1254] [42] [435-555-1541] [Opratory=1,PCP=1]' + '\n' +
        '[Vox, Bono] [414-45-1475] [51] [801-555-2100] [Opratory=3,PCP=2]')
    })

    test('Validate convertBodyToStringBlock Happy Path', () => {
        testString = '"Patient Name","SSN","Age","Phone Number","Status"' + '\n' + 
        '"Prescott, Zeke","542-51-6641",21,"801-555-2134","Opratory=2,PCP=1"'  + '\n' +
        '"Goldstein, Bucky","635-45-1254",42,"435-555-1541","Opratory=1,PCP=1"' + '\n' +
        '"Vox, Bono","414-45-1475",51,"801-555-2100","Opratory=3,PCP=2"';

        expect(parseBody.convertBodyToStringBlock(testString)).toBe(
            '[Patient Name] [SSN] [Age] [Phone Number] [Status]' + '\n' +
            '[Prescott, Zeke] [542-51-6641] [21] [801-555-2134] [Opratory=2,PCP=1]' + '\n' +
            '[Goldstein, Bucky] [635-45-1254] [42] [435-555-1541] [Opratory=1,PCP=1]' + '\n' +
            '[Vox, Bono] [414-45-1475] [51] [801-555-2100] [Opratory=3,PCP=2]')
    })

    test('Validate convertBodyToStringBlock returns single item from request body without second new line appended', () => {
        testString = '"Patient Name","SSN","Age","Phone Number","Status"';

        expect(parseBody.convertBodyToStringBlock(testString)).toBe(
            '[Patient Name] [SSN] [Age] [Phone Number] [Status]')
    })

    test('Validate convertBodyToStringBlock returns additional lines above example', () => {
        testString = '"Patient Name","SSN","Age","Phone Number","Status"' + '\n' + 
        '"Prescott, Zeke","542-51-6641",21,"801-555-2134","Opratory=2,PCP=1"'  + '\n' +
        '"Goldstein, Bucky","635-45-1254",42,"435-555-1541","Opratory=1,PCP=1"' + '\n' +
        '"Vox, Bono","414-45-1475",51,"801-555-2100","Opratory=3,PCP=2"' + '\n' +
        '"Tutone, Tommy","513-95-7520",81,"801.867.5309","Opratory=11,PCP=-1"';

        expect(parseBody.convertBodyToStringBlock(testString)).toBe(
            '[Patient Name] [SSN] [Age] [Phone Number] [Status]' + '\n' +
            '[Prescott, Zeke] [542-51-6641] [21] [801-555-2134] [Opratory=2,PCP=1]' + '\n' +
            '[Goldstein, Bucky] [635-45-1254] [42] [435-555-1541] [Opratory=1,PCP=1]' + '\n' +
            '[Vox, Bono] [414-45-1475] [51] [801-555-2100] [Opratory=3,PCP=2]' + '\n' +
            '[Tutone, Tommy] [513-95-7520] [81] [801.867.5309] [Opratory=11,PCP=-1]')
    })
});