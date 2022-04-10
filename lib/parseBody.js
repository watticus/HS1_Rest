const { convertCsv } = require('./convertCsv');

/**
 * 
 * @param {String} body input from endpoint 
 * @returns {Array} split by new line
 */
const splitBody = (body) => body.split('\n');

/**
 * 
 * @param {Array} array 
 * @returns {String} concatenated with new lines for each array entered
 */
const convertArrayToBlockFormatString = (array) => {
    let blockString = '';
    // Iterates over supplied array and appends new line to all but last entry
    for (let i = 0; i <= array.length; i++) {
        if (i < array.length -1) {
            blockString += (convertCsv(array[i]) + '\n'); 
        } else if (i == array.length -1) {
            blockString += (convertCsv(array[i]));
        }
    }
    // Array.from(array).forEach(element => {        
    //     blockString += (convertCsv(element) + '\n');        
    // });
    return blockString;
}

/**
 * 
 * @param {String} body from endpoint input
 * @returns {String} with block notation and formatted with new line
 */
const convertBodyToStringBlock = (body) => {
    const bodyArray = splitBody(body);
    const convertedArray = convertArrayToBlockFormatString(bodyArray);
    return convertedArray;
}

exports.splitBody = splitBody;
exports.convertArrayToBlockFormatString = convertArrayToBlockFormatString;
exports.convertBodyToStringBlock = convertBodyToStringBlock;