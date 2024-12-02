const safeValidator = require('./safeValidator');

test('[ 7, 6, 4, 2, 1 ] is safe', () => {
    expect(safeValidator([ 7, 6, 4, 2, 1 ])).toBe(true);
});

test('[ 1, 2, 7, 8, 9 ] is not safe', () => {
    expect(safeValidator([ 1, 2, 7, 8, 9 ])).toBe(false);
});

test('[ 9, 7, 6, 2, 1 ] is not safe', () => {
    expect(safeValidator([ 9, 7, 6, 2, 1 ])).toBe(false);
});

test('[ 1, 3, 2, 4, 5 ] is not safe', () => {
    expect(safeValidator([ 1, 3, 2, 4, 5 ])).toBe(false);
});

test('[ 1, 3, 6, 7, 9 ] is safe', () => {
    expect(safeValidator([ 1, 3, 6, 7, 9 ])).toBe(true);
});
