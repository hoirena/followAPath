const { getStartAndValidateCharacters } = require('./initialValidation');
const { findNextOrientation, getNextCharacterPosition } = require("./finderLogic");
const allMatrix = require('./constantsForTesting');

function findPathAndLetters(matrix) {
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

for (const [key, matrix] of Object.entries(allMatrix)) {
    const { letters, path } = findPathAndLetters(matrix);
    console.log(`${key}:`);
    console.log('letters:', letters);
    console.log('path:', path);
    console.log(`\n`);
    if (key.includes('6')) break;
}

module.exports = { findPathAndLetters };
