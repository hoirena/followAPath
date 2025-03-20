function findPathAndLetters(matrix) {
    const { getStartAndValidateCharacters } = require('./initialValidation');
    const { findNextOrientation, getNextCharacterPosition } = require("./finderLogic");
    const { startPosition } = getStartAndValidateCharacters(matrix);
    let orientation = null;
    let row = startPosition.row;
    let col = startPosition.col;
    let currentCharacter = matrix[row][col];
    let path = '';
    let letters = '';

    path += matrix[row][col];

    let usedLetterAt = [{}];
    do {
        orientation = findNextOrientation(row, col, orientation, matrix);
        const { nextRow, nextCol } = getNextCharacterPosition(row, col, orientation);
        row = nextRow;
        col = nextCol;

        if (matrix[row][col].match(/[A-Z]/)) {
            const isUsed = usedLetterAt.find((el) => el.row === row && el.col === col);
            if (!isUsed) {
                letters += matrix[row][col];
                usedLetterAt.push({row, col});
            }
        }
        path += matrix[row][col];
        currentCharacter = matrix[row][col];
    } while (currentCharacter !== 'x');

    return { letters, path };
};

module.exports = { findPathAndLetters };
