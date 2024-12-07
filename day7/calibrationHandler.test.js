const isPossibleToCalibrate = require('./calibrationHandler');


test('190: 10 19 is possible', () => {
    expect(isPossibleToCalibrate({expected: 190, numbers: [10, 19]})).toBe(true);
});
test('3267: 81 40 27 is possible', () => {
    expect(isPossibleToCalibrate({expected: 3267, numbers: [81, 40, 27]})).toBe(true);
});
test('83: 17 5 is not possible', () => {
    expect(isPossibleToCalibrate({expected: 83, numbers: [17, 5]})).toBe(false);
});
test('156: 15 6 is not possible', () => {
    expect(isPossibleToCalibrate({expected: 156, numbers: [15, 6]})).toBe(false);
});
test('7290: 6 8 6 15 is not possible', () => {
    expect(isPossibleToCalibrate({expected: 7290, numbers: [6, 8, 6, 15]})).toBe(false);
});
test('161011: 16 10 13 is not possible', () => {
    expect(isPossibleToCalibrate({expected: 161011, numbers: [16, 10, 13]})).toBe(false);
});
test('192: 17 8 14 is not possible', () => {
    expect(isPossibleToCalibrate({expected: 192, numbers: [17, 8, 14]})).toBe(false);
});
test('21037: 9 7 18 13 is not possible', () => {
    expect(isPossibleToCalibrate({expected: 21037, numbers: [9, 7, 18, 13]})).toBe(false);
});
test('292: 11 6 16 20 is possible', () => {
    expect(isPossibleToCalibrate({expected: 292, numbers: [11, 6, 16, 20]})).toBe(true);
});