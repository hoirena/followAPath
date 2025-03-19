function getStartAndValidateCharacters(matrix) {
    let startPosition = null;
    let endPosition = null;
    for (let row=0; row<matrix.length; row++) {
        for (let col=0; col<matrix[row].length; col++) {
            const currentCharacter = matrix[row][col];
            if (currentCharacter === '@') {
                if (startPosition) {
                    throw new Error('Multiple starts');
                }
                startPosition = { row, col };
            }
            if (currentCharacter === 'x') {
                endPosition = { row, col };
            }
            if (currentCharacter && !currentCharacter.match(/[A-Z@x|\-+\s]/)) {
                throw new Error(`Invalid character '${currentCharacter}' found`);
            }
        }
    }
    if (!startPosition) throw new Error('Missing start character');
    if (!endPosition) throw new Error('Missing end character');
    return { startPosition };
};

module.exports = { getStartAndValidateCharacters };
