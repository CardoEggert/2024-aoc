function mulParserSwitched(input) {
    const matchedOperations = input.match(/mul\(\d+,\d+\)|do\(\)|don't\(\)/g)
    const multiplyResults = [];
    if (matchedOperations) {
        let ignoreMuls = false;
        for (let i = 0; i < matchedOperations.length; i++) {
            const operation = matchedOperations[i];
            if (operation === 'do()') {
                ignoreMuls = false;
                continue;
            } else if (operation === 'don\'t()') {
                ignoreMuls = true;
                continue;
            } else if (!ignoreMuls && operation.indexOf('mul') > -1) {
                const numbers  = matchedOperations[i].replace('mul(', '').replace(')', '').split(',').map(Number);
                multiplyResults.push(numbers[0] * numbers[1]);
            }
        }
    }
    return multiplyResults.reduce((acc, el) => acc + el, 0); // sum them up
}

module.exports = mulParserSwitched;
