function masCounter(input) {
    let count = 0;
    for (let horizontalIndx = 0; horizontalIndx < input.length; horizontalIndx++) {
        for (let verticalIndx = 0; verticalIndx < input[horizontalIndx][0].length; verticalIndx++) {
            const letter = charAt(input, horizontalIndx, verticalIndx);;
            if (letter === 'A') {
                if (charAt(input, horizontalIndx - 1, verticalIndx - 1) === 'M'
                && charAt(input, horizontalIndx - 1, verticalIndx + 1) === 'S'
                && charAt(input, horizontalIndx + 1, verticalIndx - 1) === 'M'
                && charAt(input, horizontalIndx + 1, verticalIndx + 1) === 'S') {
                    count += 1;
                } else if (charAt(input, horizontalIndx - 1, verticalIndx - 1) === 'S'
                    && charAt(input, horizontalIndx - 1, verticalIndx + 1) === 'S'
                    && charAt(input, horizontalIndx + 1, verticalIndx - 1) === 'M'
                    && charAt(input, horizontalIndx + 1, verticalIndx + 1) === 'M') {
                    count += 1;
                } else if (charAt(input, horizontalIndx - 1, verticalIndx - 1) === 'S'
                    && charAt(input, horizontalIndx - 1, verticalIndx + 1) === 'M'
                    && charAt(input, horizontalIndx + 1, verticalIndx - 1) === 'S'
                    && charAt(input, horizontalIndx + 1, verticalIndx + 1) === 'M') {
                    count += 1;
                } else if (charAt(input, horizontalIndx - 1, verticalIndx - 1) === 'M'
                    && charAt(input, horizontalIndx - 1, verticalIndx + 1) === 'M'
                    && charAt(input, horizontalIndx + 1, verticalIndx - 1) === 'S'
                    && charAt(input, horizontalIndx + 1, verticalIndx + 1) === 'S') {
                    count += 1;
                }
            }
        }
    }
    return count;
}

function charAt(input, horizontalIndx, verticalIndx) {
    if (input[horizontalIndx] && input[horizontalIndx][0] && input[horizontalIndx][0][verticalIndx]) {
        return input[horizontalIndx][0][verticalIndx];
    }
    return 'Z';
}

module.exports = masCounter;
