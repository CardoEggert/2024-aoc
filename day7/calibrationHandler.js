function isPossibleToCalibrate(calibration) {
    const { expected, numbers } = calibration;
    const allowedOperatorCount = numbers.length - 1;
    if (numbers.length > 1) {
        return findAnyMatchingCombination(numbers, allowedOperatorCount, expected);
    }
    return numbers[0] === expected;
}

function findAnyMatchingCombination(numbers, allowedOperatorCount, expectedResult) {
    return findMatchingCombination(numbers, 1, allowedOperatorCount, '+', numbers[0], expectedResult)
        || findMatchingCombination(numbers, 1, allowedOperatorCount, '*', numbers[0], expectedResult);
}

function findMatchingCombination(numbers, nextNumberIndx, operatorCount, operator, currentResult, expectedResult) {
    if (currentResult === expectedResult) {
        return true;
    }
    if (operatorCount === 0) {
        return currentResult === expectedResult;
    }
    const number = numbers[nextNumberIndx];
    if (operator === '+') {
        return findMatchingCombination(numbers, nextNumberIndx + 1, operatorCount - 1, '+', currentResult + number, expectedResult)
            || findMatchingCombination(numbers, nextNumberIndx + 1, operatorCount - 1, '*', currentResult + number, expectedResult);
    } else if (operator === '*') {
        return findMatchingCombination(numbers, nextNumberIndx + 1, operatorCount - 1, '+', currentResult * number, expectedResult)
            || findMatchingCombination(numbers, nextNumberIndx + 1, operatorCount - 1, '*', currentResult * number, expectedResult);
    }
}

module.exports = isPossibleToCalibrate;