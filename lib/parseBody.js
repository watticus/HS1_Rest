const { convertCsv } = require("C:/git/HS1_Rest/lib/convertCsv");

const splitBody = (body) => body.split("\n")

const convertArrayToBlockFormatString = (array) => {
    let blockString = '';
    Array.from(array).forEach(element => {
         blockString += (convertCsv(element) + '\n');
    });
    return blockString;
}

const convertBodyToStringBlock = (body) => {
    const bodyArray = splitBody(body);
    const convertedArray = convertArrayToBlockFormatString(bodyArray);
    return convertedArray;
}

exports.convertBodyToStringBlock = convertBodyToStringBlock;