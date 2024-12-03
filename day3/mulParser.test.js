const mulParser = require('./mulParser');

test('mul(2,4) produces 8', () => {
    expect(mulParser('mul(2,4)')).toBe(8);
});

test('%&mul[3,7] produces 0', () => {
    expect(mulParser('%&mul[3,7]')).toBe(0);
});

test('!@^do_not_mul(5,5) produces 25', () => {
    expect(mulParser('!@^do_not_mul(5,5)')).toBe(25);
});

test('mul(32,64]then(mul(11,8) produces 88', () => {
    expect(mulParser('mul(32,64]then(mul(11,8)')).toBe(88);
});

test('then(mul(11,8)mul(8,5)) produces 128 ', () => {
    expect(mulParser('then(mul(11,8)mul(8,5))')).toBe(128);
});

test('xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5)) produces 161', () => {
    expect(mulParser('xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))')).toBe(161);
});