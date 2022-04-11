/**
 * 
 * @param {String} csv 
 * @returns {Array} split from input string using comma as a delimiter
 */
const splitCsv = (csv) => csv.split(',');

/**
 * 
 * @param {Array} array 
 * @returns {Array} with quotation marks replaced with brackets
 */
const replaceQuotesWithBrackets = (array) => {
    let bracketArray = [];
    Array.from(array).forEach(element => {
        if (element.includes('"')) {
            // If double quotation marks appear only at the beginning of the element string
            if (element.indexOf('"') == 0 && element.indexOf('"', 1) == -1) {
                bracketArray.push(element.replace('"', '['));
            }
            // If double quotation marks appear only at the end of the element string
            else if (element.indexOf('"') !=0 && element.indexOf('"', 1) != -1){
                let quoteIndex = element.indexOf('"', 1);
                bracketArray.push(element.slice(0, quoteIndex).concat(']'));
            }
            // If double quotation marks appear at both beginning and the end of the element string
            else {
                let quoteIndex = element.indexOf('"', 1);
                bracketArray.push(element.slice(0, quoteIndex).concat(']').replace('"', '['));
            }
        }
        // If no double quotation marks appear in the element string
        else {
            bracketArray.push('[' + element + ']');                  
        }        
    })
    return bracketArray   
}

/**
 * 
 * @param {Array} bracketedArray 
 * @returns {String} in bracket format
 */
const formatBracketArrayToStringOutput = (bracketedArray) => {
    return bracketedArray.join().replaceAll('],[', '] [')
}

/**
 * 
 * @param {String} csv 
 * @returns {String} fully formatted with block notation
 */
const convertCsv = (csv) => {
    const splitArray = splitCsv(csv);
    const bracketArray = replaceQuotesWithBrackets(splitArray);
    return formatBracketArrayToStringOutput(bracketArray)
}

exports.splitCsv = splitCsv;
exports.replaceQuotesWithBrackets = replaceQuotesWithBrackets;
exports.convertCsv = convertCsv;