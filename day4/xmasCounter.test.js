const xmasCounter = require('./xmasCounter');

test('horizontal empty array produces 0', () => {
    expect(xmasCounter([[]])).toBe(0);
});

test('horizontal no xmas produces 0', () => {
    expect(xmasCounter([['MMASASASASSSAA']])).toBe(0);
});

test('horizontal one xmas produces 1', () => {
    expect(xmasCounter([['MMAXMASASSSAA']])).toBe(1);
});

test('horizontal two xmas produces 2', () => {
    expect(xmasCounter([['XMASXMASSSSSS']])).toBe(2);
});

test('horizontal-reversed two samx produces 2', () => {
    expect(xmasCounter([['SSSAMXSSAMXSS']])).toBe(2);
});

test('horizontal three xmas produces 3', () => {
    expect(xmasCounter([['MASSXMASXMASSSXMASSS']])).toBe(3);
});

test('vertical no xmas produces 0', () => {
    expect(xmasCounter([['M'], ['S'], ['A'], ['M']])).toBe(0);
});

test('vertical one xmas produces 1', () => {
    expect(xmasCounter([['X'], ['M'], ['A'], ['S']])).toBe(1);
});

test('vertical one with other chars xmas produces 1', () => {
    expect(xmasCounter([['SX'], ['SM'], ['SA'], ['SS']])).toBe(1);
});

test('vertical one with other chars SMAX produces 1', () => {
    expect(xmasCounter([['SS'], ['SA'], ['SM'], ['SX']])).toBe(1);
});

test('diagonal no xmas produces 0', () => {
    expect(xmasCounter([['MMMM'], ['SSSS'], ['AAAA'], ['MMMM']])).toBe(0);
});

test('diagonal one xmas produces 1', () => {
    expect(xmasCounter([['XSSS'], ['SMSS'], ['SSAS'], ['SSSS']])).toBe(1);
});

test('diagonal two xmas produces 2', () => {
    expect(xmasCounter([['XSSX'], ['SMMS'], ['SAAS'], ['SSSS']])).toBe(2);
});

test('diagonal two smax produces 2', () => {
    expect(xmasCounter([['SSSS'], ['SAAS'], ['SMMS'], ['SXXS']])).toBe(2);
});

test('example test cases produces 18', () => {
    expect(xmasCounter(
        [
            ['MMMSXXMASM'],
            ['MSAMXMSMSA'],
            ['AMXSXMAAMM'],
            ['MSAMASMSMX'],
            ['XMASAMXAMM'],
            ['XXAMMXXAMA'],
            ['SMSMSASXSS'],
            ['SAXAMASAAA'],
            ['MAMMMXMMMM'],
            ['MXMXAXMASX']]
    )).toBe(18);
});