const { getStartAndValidateCharacters } = require('./initialValidation');

describe('Validation Tests - should throw error for invalid maps with appropriate message', () => {
    test('Example: Missing start character', () => {
        const matrix = [
            "   -A---+",
            "        |",
            "x-B-+   C",
            "    |   |",
            "    +---+"
        ];

        expect(() => getStartAndValidateCharacters(matrix)).toThrow('Missing start character');
    });
    test('Example: Missing end character', () => {
        const matrix = [
            "@--A---+",
            "       |",
            " B-+   C",
            "   |   |",
            "   +---+"
        ];

        expect(() => getStartAndValidateCharacters(matrix)).toThrow('Missing end character');
    });
    test('Example: Multiple starts', () => {
        const matrix = [
            " @--A-@-+",
            "        |",
            "x-B-+   C",
            "    |   |",
            "    +---+"
        ];

        expect(() => getStartAndValidateCharacters(matrix)).toThrow('Multiple starts');
    });
    test("Example: Invalid '5' character", () => {
        const matrix = [
            "@-A--+",
            "     |",
            "     +-B5-x-C--D"
        ];

        expect(() => getStartAndValidateCharacters(matrix)).toThrow('Invalid character \'5\' found');
    });
});