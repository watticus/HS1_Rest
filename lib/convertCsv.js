const splitCsv = (csv) => csv.split(',');

const replaceQuotesWithBrackets = (array) => {
    let bracketArray = []
    Array.from(array).forEach(element => {
        if (element.includes('"')) {
            // If quote appears only in the beginning of element string
            if (element.indexOf('"') == 0 && element.indexOf('"', 1) == -1) {
                // console.log(element.replace('"', '['))
                bracketArray.push(element.replace('"', '['))
            }
            // If quote appears only in the end of element string
            else if (element.indexOf('"') !=0 && element.indexOf('"', 1) != -1){
                let quoteIndex = element.indexOf('"', 1)
                bracketArray.push(element.slice(0, quoteIndex).concat(']'))
            }
            // If quote appears in both begginnging and the end
            else {
                let quoteIndex = element.indexOf('"', 1)
                bracketArray.push(element.slice(0, quoteIndex).concat(']').replace('"', '['))
            }
        }
        // If no quotes appear in element
        else {
            bracketArray.push('[' + element + ']')                   
        }        
    })
    return bracketArray   
}

const formatBracketArrayToStringOutput = (bracketedArray) => {
    return bracketedArray.join().replaceAll('],[', '] [')
}

const convertCsv = (csv) => {
    const splitArray = splitCsv(csv);
    const bracketArray = replaceQuotesWithBrackets(splitArray);
    return formatBracketArrayToStringOutput(bracketArray)
}

exports.convertCsv = convertCsv;