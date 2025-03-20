const { findPathAndLetters } = require('./index');

describe('Should return correct letters and path for a given matrix', () => {
    test('A basic example', () => {
        const matrix = [
                "@---A---+",
                "        |",
                "x-B-+   C",
                "    |   |",
                "    +---+"
            ];
        
        expect(findPathAndLetters(matrix)).toEqual({
          letters: "ACB",
          path: "@---A---+|C|+---+|+-B-x",
        });
    });
    test('Example: Go straight through intersections', () => {
        const matrix = [
                "@",
                "| +-C--+",
                "A |    |",
                "+---B--+",
                "  |      x",
                "  |      |",
                "  +---D--+"
            ];
        
        expect(findPathAndLetters(matrix)).toEqual({
          letters: "ABCD",
          path: "@|A+---B--+|+--C-+|-||+---D--+|x",
        });
    });
    test('Example: Letters may be found on turns', () => {
        const matrix = [
                "@---A---+",
                "        |",
                "x-B-+   |",
                "    |   |",
                "    +---C"
            ];
        
        expect(findPathAndLetters(matrix)).toEqual({
          letters: "ACB",
          path: "@---A---+|||C---+|+-B-x",
        });
    });
    test('Example: Do not collect a letter from the same location twice', () => {
        const matrix = [
                "    +-O-N-+",
                "    |     |",
                "    |   +-I-+",
                "@-G-O-+ | | |",
                "    | | +-+ E",
                "    +-+     S",
                "            |",
                "            x"
            ];
        
        expect(findPathAndLetters(matrix)).toEqual({
          letters: "GOONIES",
          path: "@-G-O-+|+-+|O||+-O-N-+|I|+-+|+-I-+|ES|x",
        });
    });
    test('Example: Keep direction, even in a compact space', () => {
        const matrix = [
                " +-L-+",
                " |  +A-+",
                "@B+ ++ H",
                " ++    x"
            ];
        
        expect(findPathAndLetters(matrix)).toEqual({
          letters: "BLAH",
          path: "@B+++B|+-L-+A+++A-+Hx",
        });
    });
    test('Example: Ignore stuff after end of path', () => {
        const matrix = [
                "@-A--+",
                "     |",
                "     +-B--x-C--D"
            ];
        
        expect(findPathAndLetters(matrix)).toEqual({
          letters: "AB",
          path: "@-A--+|+-B--x",
        });
    });
});

describe('Should throw error for invalid maps with appropriate message', () => {
    test('Error message: Fork in path', () => {
        const matrix = [
            "      x-B",
            "        |",
            " @--A---+",
            "        |",
            "   x+   C",
            "    |   |",
            "    +---+"
        ];
    
        expect(() => findPathAndLetters(matrix)).toThrow('Fork in path');
    });
    test('Error message: Broken path', () => {
        const matrix = [
            "@--A-+",
            "     |",
            "     ",
            "     B-x"
        ];
        
        expect(() => findPathAndLetters(matrix)).toThrow('Broken path');
    });
    test('Error message: Multiple starting paths', () => {
        const matrix = [
            "x-B-@-A-x"
        ];
        
        expect(() => findPathAndLetters(matrix)).toThrow('Multiple starting paths');
    });
    test('Error message: Fake turn', () => {
        const matrix = [
            "@-A-+-B-x"
        ];
        
        expect(() => findPathAndLetters(matrix)).toThrow('Fake turn');
    });
});
