function mulParser(input) {
    const matchedMuls = input.match(/mul\(\d+,\d+\)/g)
    const multiplyResults = [];
    if (matchedMuls) {
        for (let i = 0; i < matchedMuls.length; i++) {
            const numbers  = matchedMuls[i].replace('mul(', '').replace(')', '').split(',').map(Number);
            multiplyResults.push(numbers[0] * numbers[1]);
        }
    }
    return multiplyResults.reduce((acc, el) => acc + el, 0); // sum them up
}

module.exports = mulParser;
