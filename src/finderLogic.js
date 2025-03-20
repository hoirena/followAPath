function getOrientedNeighbours(row, col, orientation, matrix) {
    let neighbours = {
        left: null,
        front: null,
        right: null,
    };
    const lastRowIndex = matrix.length - 1;
    if (row > lastRowIndex) throw new Error('row not in matrix');
    const lastColIndex = matrix[row].length - 1;
    if (col > lastColIndex) throw new Error('col not in matrix');

    switch (orientation) {
        case 'east': {
            neighbours.left = row > 0 ? matrix[row - 1][col] : null;
            neighbours.front = col < lastColIndex ? matrix[row][col + 1] : null;
            neighbours.right = row < lastRowIndex ? matrix[row + 1][col] : null;
            break;
        }
        case 'south': {
            neighbours.left = col < lastColIndex ? matrix[row][col + 1] : null;
            neighbours.front = row < lastRowIndex ? matrix[row + 1][col] : null;
            neighbours.right = col > 0 ? matrix[row][col - 1] : null;
            break;
        }
        case 'west': {
            neighbours.left = row < lastRowIndex ? matrix[row + 1][col] : null;
            neighbours.front = col > 0 ? matrix[row][col - 1] : null;
            neighbours.right = row > 0 ? matrix[row - 1][col] : null;
            break;
        }
        case 'north':
        case null: { // First character, no orientation, back neighbour added
            neighbours.left = col > 0 ? matrix[row][col - 1] : null;
            neighbours.front = row > 0 ? matrix[row - 1][col] : null;
            neighbours.right = col < lastColIndex ? matrix[row][col + 1] : null;
            neighbours.back = row < lastRowIndex ? matrix[row + 1][col] : null;
            break;
        }
    }

    if (Object.values(neighbours).some((neighbour) => neighbour)) {

        return neighbours;
    } else throw new Error('Broken path');
};

function getOrientationForTurn(orientation, neighbours) {
    let newOrientationFound = null;
    if (neighbours.left !== ' ' && neighbours.left) {
        switch (orientation) {
            case 'east': {
                newOrientationFound = 'north';
                break;
            }
            case 'south': {
                newOrientationFound = 'east';
                break;
            }
            case 'west': {
                newOrientationFound = 'south';
                break;
            }
            case 'north': {
                newOrientationFound = 'west';
                break;
            }
        }
    }
    if (neighbours.right !== ' ' && neighbours.right) {
        if (newOrientationFound) throw new Error('Fork in path');
        switch (orientation) {
            case 'east': {
                newOrientationFound = 'south';
                break;
            }
            case 'south': {
                newOrientationFound = 'west';
                break;
            }
            case 'west': {
                newOrientationFound = 'north';
                break;
            }
            case 'north': {
                newOrientationFound = 'east';
                break;
            }
        }
    }
    if (newOrientationFound) return newOrientationFound;
    else throw new Error('Fake turn');
};

function findNextOrientation(row, col, previousOrientation, matrix) {
    const currentCharacter = matrix[row][col];
    let orientation = previousOrientation;
    const neighbours = getOrientedNeighbours(row, col, orientation, matrix);

    if (currentCharacter === '@') {
        for (let key in neighbours) {
            if (neighbours[key] !== ' ' && neighbours[key]) {
                if (orientation) throw new Error('Multiple starting paths');
                switch (key) {
                    case 'left': {
                        orientation = 'west';
                        break;
                    }
                    case 'front': {
                        orientation = 'north';
                        break;
                    }
                    case 'right': {
                        orientation = 'east';
                        break;
                    }
                    case 'back': {
                        orientation = 'south';
                        break;
                    }
                }
            }
        }

        return orientation;
    } else if (currentCharacter !== 'x') {
        switch (currentCharacter) {
            case '+': {

                return getOrientationForTurn(orientation, neighbours);
            }
            case '-':
            case '|': {
                if (neighbours.front !== ' ' && neighbours.front) {

                    return orientation;
                }
                break;
            }
            case currentCharacter.match(/[A-Z]/)?.input: {
                if (neighbours.front !== ' ' && neighbours.front) {

                    return orientation;
                }

                return getOrientationForTurn(orientation, neighbours);
            }
            default: {
                throw new Error('Error in finding next orientation.');
            }
        }
    }
};

function getNextCharacterPosition(currentRow, currentCol, orientation) {
    let nextRow = currentRow;
    let nextCol = currentCol;

    switch (orientation) {
        case 'east': {
            nextCol += 1;
            break;
        }
        case 'south': {
            nextRow += 1;
            break;
        }
        case 'west': {
            nextCol -= 1;
            break;
        }
        case 'north': {
            nextRow -= 1;
            break;
        }
    }

    return { nextRow, nextCol };
}

module.exports = {
  findNextOrientation,
  getNextCharacterPosition,
  getOrientedNeighbours,
  getOrientationForTurn,
};
