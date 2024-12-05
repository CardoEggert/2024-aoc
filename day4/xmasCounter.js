

function xmasCounter(input) {
    const verticalXmasCount = findVerticalCount(input, 'XMAS');
    const horizontalXmasCount = findHorizontalCount(input, 'XMAS');
    const diagonalXmasCount = findDiagonalCount(input, 'XMAS');
    const verticalSmaxCount = findVerticalCount(input, 'SAMX');
    const horizontalSmaxCount = findHorizontalCount(input, 'SAMX');
    const diagonalSmaxCount = findDiagonalCount(input, 'SAMX');
    return verticalXmasCount
        + horizontalXmasCount
        + diagonalXmasCount
        + verticalSmaxCount
        + horizontalSmaxCount
        + diagonalSmaxCount;
}

function findVerticalCount(input, searchedString) {
    let count = 0;
    const flippedInput = flipInput(input);
    if (flippedInput) {
        for (let i = 0; i < flippedInput.length; i++) {
            const horizontal = flippedInput[i];
            if (horizontal.length === 1) {
                count += findOccurrences(horizontal[0], searchedString);
            }
        }
    }
    return count;
}

function flipInput(input) {
    const flipped = [];
    if (input && input[0] && input[0][0]) {
        for (let arrayIndx = 0; arrayIndx < input[0][0].length; arrayIndx++) {
            flipped.push(['']);
        }
        for (let horizontalIndx = 0; horizontalIndx < input.length; horizontalIndx++) {
            for (let verticalIndx = 0; verticalIndx < input[horizontalIndx][0].length; verticalIndx++) {
                const char = input[horizontalIndx][0][verticalIndx];
                flipped[verticalIndx][0] += char;
            }
        }
    }
    return flipped;
}

function findHorizontalCount(input, searchedString) {
    let count = 0;
    if (input && input[0] && input[0][0]) {
        for (let i = 0; i < input.length; i++) {
            const horizontal = input[i];
            if (horizontal.length === 1) {
                count += findOccurrences(horizontal[0], searchedString);
            }
        }
    }
    return count;
}

function findDiagonalCount(input, searchedString) {
    let count = 0;
    if (input && input[0] && input[0][0]) {
        const firstLetter = searchedString[0];
        for (let horizontalIndx = 0; horizontalIndx < input.length; horizontalIndx++) {
            for (let verticalIndx = 0; verticalIndx < input[horizontalIndx][0].length; verticalIndx++) {
                const letter = input[horizontalIndx][0][verticalIndx];
                if (firstLetter === letter) {
                    const downLeftMatch = findDepthLeft(input, searchedString.substring(1), horizontalIndx + 1, verticalIndx - 1, firstLetter);
                    if (downLeftMatch === searchedString) {
                        count += 1;
                    }
                    const downRightMatch = findDepthRight(input, searchedString.substring(1), horizontalIndx + 1, verticalIndx + 1, firstLetter);
                    if (downRightMatch === searchedString) {
                        count += 1;
                    }
                }
            }
        }
    }
    return count;
}

function findDepthLeft(input, searchedString, horizontalIndx, verticalIndx, foundText) {
    if (!charPresent(input, horizontalIndx, verticalIndx) || searchedString.length < 1 || horizontalIndx < 0 || verticalIndx < 0 || horizontalIndx >= input.length || verticalIndx > input[0][0].length) {
        return foundText;
    }
    return findDepthLeft(input, searchedString.substring(1), horizontalIndx + 1, verticalIndx - 1, foundText + input[horizontalIndx][0][verticalIndx]);
}

function findDepthRight(input, searchedString, horizontalIndx, verticalIndx, foundText) {
    if (!charPresent(input, horizontalIndx, verticalIndx) || searchedString.length < 1 || horizontalIndx < 0 || verticalIndx < 0 || horizontalIndx >= input.length || verticalIndx > input[0][0].length) {
        return foundText;
    }
    return findDepthRight(input, searchedString.substring(1), horizontalIndx + 1, verticalIndx + 1, foundText + input[horizontalIndx][0][verticalIndx]);
}

function charPresent(input, hIndx, vIndx) {
    return input && input[hIndx] && input[hIndx][0] && input[hIndx][0][vIndx];
}

function findOccurrences(input, searchString) {
    const regex = new RegExp(searchString, 'g');
    const matches = input.match(regex);
    return matches ? matches.length : 0;
}

module.exports = xmasCounter;
