const { convertCsv } = require("C:/git/HS1_Rest/lib/convertCsv");

/**
 * 
 * @param {String} body input from endpoint 
 * @returns {Array} split by new line
 */
const splitBody = (body) => body.split("\n");

/**
 * 
 * @param {Array} array 
 * @returns {String} concatenated with new lines for each array entered
 */
const convertArrayToBlockFormatString = (array) => {
    let blockString = '';
    Array.from(array).forEach(element => {
         blockString += (convertCsv(element) + '\n');
    });
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

exports.convertBodyToStringBlock = convertBodyToStringBlock;