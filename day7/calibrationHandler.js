function isPossibleToCalibrate(calibration, allowedOperators) {
    const { expected, numbers } = calibration;
    const allowedOperatorCount = numbers.length - 1;
    if (numbers.length > 1) {
        return findAnyMatchingCombination(numbers, allowedOperatorCount, expected, allowedOperators);
    }
    return numbers[0] === expected;
}

function findAnyMatchingCombination(numbers, allowedOperatorCount, expectedResult, allowedOperators) {
    for (let operatorIndx = 0; operatorIndx < allowedOperators.length; operatorIndx++) {
        if (findMatchingCombination(numbers, 1, allowedOperatorCount, allowedOperators[operatorIndx], numbers[0], expectedResult, allowedOperators)) {
            return true;
        }
    }
    return false;
}

function findMatchingCombination(numbers, nextNumberIndx, operatorCount, operator, currentResult, expectedResult, allowedOperators) {
    if (operatorCount === 0) {
        return currentResult === expectedResult;
    }
    const number = numbers[nextNumberIndx];
    const newResult = findResult(currentResult, number, operator);
    for (let operatorIndx = 0; operatorIndx < allowedOperators.length; operatorIndx++) {
        if (findMatchingCombination(numbers, nextNumberIndx + 1, operatorCount - 1, allowedOperators[operatorIndx], newResult, expectedResult, allowedOperators)) {
            return true;
        }
    }
    return false;
}

function findResult(currentResult, number, operator) {
    if (operator === '+') {
        return currentResult + number;
    } else if (operator === '*') {
        return currentResult * number;
    } else if (operator === '||') {
        return Number(currentResult + '' + number);
    }
}

module.exports = {
    isPossibleToCalibrate
};