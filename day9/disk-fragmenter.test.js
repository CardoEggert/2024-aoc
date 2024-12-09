const {fragmentDisk, calculateChecksum} = require('./disk-fragmenter');

test('12345 produces 022111222......', () => {
    expect(fragmentDisk('12345', false)).toStrictEqual([0, 2, 2, 1, 1, 1, 2, 2, 2, '.', '.', '.', '.', '.', '.']);
});

test('2333133121414131402 produces 0099811188827773336446555566..............', () => {
    expect(fragmentDisk('2333133121414131402', false)).toStrictEqual(
        [0, 0, 9, 9, 8, 1, 1, 1, 8, 8, 8, 2, 7, 7, 7, 3, 3, 3, 6, 4, 4, 6, 5, 5, 5, 5, 6, 6,
            '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.']);
});

test('2333133121414131402 produces (whole file) 00992111777.44.333....5555.6666.....8888..', () => {
    expect(fragmentDisk('2333133121414131402', true)).toStrictEqual(
        [0, 0, 9, 9, 2, 1, 1, 1, 7, 7, 7, '.', 4, 4, '.', 3, 3, 3, '.', '.', '.', '.', 5, 5, 5, 5, '.', 6, 6, 6, 6, '.', '.', '.', '.', '.', 8, 8, 8, 8, '.', '.']);
});

test('12345 checksum is 60', () => {
    expect(calculateChecksum([0, 2, 2, 1, 1, 1, 2, 2, 2, '.', '.', '.', '.', '.', '.'])).toBe(60);
});

test('2333133121414131402 checksum is 1928..............', () => {
    expect(calculateChecksum([0, 0, 9, 9, 8, 1, 1, 1, 8, 8, 8, 2, 7, 7, 7, 3, 3, 3, 6, 4, 4, 6, 5, 5, 5, 5, 6, 6,
        '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'])).toBe(1928)
});

test('2333133121414131402 checksum (whole file) is 2858', () => {
    expect(calculateChecksum([0, 0, 9, 9, 2, 1, 1, 1, 7, 7, 7, '.', 4, 4, '.', 3, 3, 3, '.', '.', '.', '.', 5, 5, 5, 5, '.', 6, 6, 6, 6, '.', '.', '.', '.', '.', 8, 8, 8, 8, '.', '.'])).toBe(2858);
});