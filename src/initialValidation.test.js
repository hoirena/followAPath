const { getStartAndValidateCharacters } = require('./initialValidation');

describe('Should throw error for invalid maps with appropriate message', () => {
    test('Error message: Missing start character', () => {
        const matrix = [
            "   -A---+",
            "        |",
            "x-B-+   C",
            "    |   |",
            "    +---+"
        ];

        expect(() => getStartAndValidateCharacters(matrix)).toThrow('Missing start character');
    });
    test('Error message: Missing end character', () => {
        const matrix = [
            "@--A---+",
            "       |",
            " B-+   C",
            "   |   |",
            "   +---+"
        ];

        expect(() => getStartAndValidateCharacters(matrix)).toThrow('Missing end character');
    });
    test('Error message: Multiple starts', () => {
        const matrix = [
            " @--A-@-+",
            "        |",
            "x-B-+   C",
            "    |   |",
            "    +---+"
        ];

        expect(() => getStartAndValidateCharacters(matrix)).toThrow('Multiple starts');
    });
    test('Error message: Invalid "5" character', () => {
        const matrix = [
            "@-A--+",
            "     |",
            "     +-B5-x-C--D"
        ];

        expect(() => getStartAndValidateCharacters(matrix)).toThrow('Invalid character \'5\' found');
    });
});
describe('Should return startPosition if matrix is valid', () => {
    test('Returns correct start position', () => {
        const matrix = [
            "@",
            "| +-C--+",
            "A |    |",
            "+---B--+",
            "  |      x",
            "  |      |",
            "  +---D--+"
        ];

        expect(getStartAndValidateCharacters(matrix)).toEqual({ startPosition: { row: 0, col: 0 }});
    });
});
