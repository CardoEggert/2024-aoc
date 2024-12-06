const trackGuard = require('./guardTracker');

test('example test case mapped correctly', () => {
    expect(trackGuard(
        [
            [
                '.', '.', '.', '.',
                '#', '.', '.', '.',
                '.', '.'
            ],
            [
                '.', '.', '.', '.',
                '.', '.', '.', '.',
                '.', '#'
            ],
            [
                '.', '.', '.', '.',
                '.', '.', '.', '.',
                '.', '.'
            ],
            [
                '.', '.', '#', '.',
                '.', '.', '.', '.',
                '.', '.'
            ],
            [
                '.', '.', '.', '.',
                '.', '.', '.', '#',
                '.', '.'
            ],
            [
                '.', '.', '.', '.',
                '.', '.', '.', '.',
                '.', '.'
            ],
            [
                '.', '#', '.', '.',
                '^', '.', '.', '.',
                '.', '.'
            ],
            [
                '.', '.', '.', '.',
                '.', '.', '.', '.',
                '#', '.'
            ],
            [
                '#', '.', '.', '.',
                '.', '.', '.', '.',
                '.', '.'
            ],
            [
                '.', '.', '.', '.',
                '.', '.', '#', '.',
                '.', '.'
            ]
        ]
    )).toStrictEqual(
        [
            [
                '.', '.', '.', '.',
                '#', '.', '.', '.',
                '.', '.'
            ],
            [
                '.', '.', '.', '.',
                'X', 'X', 'X', 'X',
                'X', '#'
            ],
            [
                '.', '.', '.', '.',
                'X', '.', '.', '.',
                'X', '.'
            ],
            [
                '.', '.', '#', '.',
                'X', '.', '.', '.',
                'X', '.'
            ],
            [
                '.', '.', 'X', 'X',
                'X', 'X', 'X', '#',
                'X', '.'
            ],
            [
                '.', '.', 'X', '.',
                'X', '.', 'X', '.',
                'X', '.'
            ],
            [
                '.', '#', 'X', 'X',
                'X', 'X', 'X', 'X',
                'X', '.'
            ],
            [
                '.', 'X', 'X', 'X',
                'X', 'X', 'X', 'X',
                '#', '.'
            ],
            [
                '#', 'X', 'X', 'X',
                'X', 'X', 'X', 'X',
                '.', '.'
            ],
            [
                '.', '.', '.', '.',
                '.', '.', '#', 'X',
                '.', '.'
            ]
        ]
    );
});