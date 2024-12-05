const masCounter = require('./masCounter');

test('example test cases produces 9', () => {
    expect(masCounter(
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
    )).toBe(9);
});