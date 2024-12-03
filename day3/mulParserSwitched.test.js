const mulParserSwitched = require('./mulParserSwitched');

test('mul(2,4) produces 8', () => {
    expect(mulParserSwitched('mul(2,4)')).toBe(8);
});

test('%&mul[3,7] produces 0', () => {
    expect(mulParserSwitched('%&mul[3,7]')).toBe(0);
});

test('!@^do_not_mul(5,5) produces 25', () => {
    expect(mulParserSwitched('!@^do_not_mul(5,5)')).toBe(25);
});

test('!@^don\'t()_not_mul(5,5) produces 0', () => {
    expect(mulParserSwitched('!@^don\'t()_not_mul(5,5)')).toBe(0);
});

test('do()mul(32,64]then(mul(11,8) produces 88', () => {
    expect(mulParserSwitched('mul(32,64]then(mul(11,8)')).toBe(88);
});

test('don\'t()mul(32,64]then(mul(11,8) produces 0', () => {
    expect(mulParserSwitched('don\'t()mul(32,64]then(mul(11,8)')).toBe(0);
});

test('don\'t()mul(32,64]then(do()mul(11,8) produces 0', () => {
    expect(mulParserSwitched('don\'t()mul(32,64]then(do()mul(11,8)')).toBe(88);
});

test('xmul(2,4)&mul[3,7]!^don\'t()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5)) produces 48', () => {
    expect(mulParserSwitched('xmul(2,4)&mul[3,7]!^don\'t()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))')).toBe(48);
});