const {
    findNextOrientation,
    getNextCharacterPosition,
    getOrientedNeighbours,
    getOrientationForTurn,
} = require("./finderLogic");

const matrix = [
    "    +-O-N-+",
    "    |     |",
    "    |   +-I-+",
    "@-G-O-+ | | |",
    "    | | +-+ E",
    "    +-+     S",
    "            |",
    "            x",
];

const matrix2 = [
    "@---A---+",
    "        |",
    "x-B-+   |",
    "    |   |",
    "    +---C",
];

describe("Test individual functions: should return correct output for a given input", () => {
    test("findNextOrientation - should return correct start and end orientation", () => {
        expect(findNextOrientation(3, 0, null, matrix)).toEqual("east");
        expect(findNextOrientation(7, 12, "south", matrix)).toBeFalsy();
    });
    test("findNextOrientation - should return correct orientation for other cases", () => {
        expect(findNextOrientation(3, 1, "west", matrix)).toEqual("west");
        expect(findNextOrientation(3, 2, "west", matrix)).toEqual("west");
        expect(findNextOrientation(3, 6, "west", matrix)).toEqual("south");
        expect(findNextOrientation(4, 6, "south", matrix)).toEqual("south");
        expect(findNextOrientation(2, 4, "north", matrix)).toEqual("north");
        expect(findNextOrientation(4, 8, "south", matrix2)).toEqual("west");
    });
    test("getNextCharacterPosition - should return correct position for next character in matrix", () => {
        expect(getNextCharacterPosition(3, 0, "east")).toEqual({
            nextRow: 3,
            nextCol: 1,
        });
        expect(getNextCharacterPosition(0, 5, "south")).toEqual({
            nextRow: 1,
            nextCol: 5,
        });
        expect(getNextCharacterPosition(3, 3, "west")).toEqual({
            nextRow: 3,
            nextCol: 2,
        });
        expect(getNextCharacterPosition(5, 1, "north")).toEqual({
            nextRow: 4,
            nextCol: 1,
        });
    });
    test("getOrientedNeighbours - should return neighbours based on current orientation", () => {
        expect(getOrientedNeighbours(3, 0, null, matrix)).toEqual({
            left: null,
            front: " ",
            right: "-",
            back: " "
        });
        expect(getOrientedNeighbours(0, 5, 'east', matrix)).toEqual({
            left: null,
            front: "O",
            right: " ",
        });
        expect(getOrientedNeighbours(0, 10, 'east', matrix)).toEqual({
            left: null,
            front: null,
            right: "|",
        });
        expect(getOrientedNeighbours(2, 10, 'south', matrix)).toEqual({
            left: "-",
            front: "|",
            right: "-",
        });
        expect(getOrientedNeighbours(4, 9, 'west', matrix)).toEqual({
            left: " ",
            front: "+",
            right: " ",
        });
        expect(getOrientedNeighbours(3, 4, 'north', matrix)).toEqual({
            left: "-",
            front: "|",
            right: "-",
            back: "|"
        });
    });
    test("getOrientationForTurn - should return new orientation based on current and left/right neighbour characters", () => {
        expect(getOrientationForTurn('east', { left: null, front: null, right: "|" })).toEqual('south');
        expect(getOrientationForTurn('north', { left: " ", front: " ", right: "-" })).toEqual('east');
        expect(getOrientationForTurn('south', { left: " ", front: " ", right: "-" })).toEqual('west');
        expect(getOrientationForTurn('south', { left: "-", front: " ", right: " " })).toEqual('east');
        expect(getOrientationForTurn('west', { left: " ", front: "S", right: "|" })).toEqual('north');
    });
});
