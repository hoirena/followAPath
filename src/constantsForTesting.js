const matrix = [
  "@---A---+",
  "        |",
  "x-B-+   C",
  "    |   |",
  "    +---+"
];

const matrix2 = [
  "@",
  "| +-C--+",
  "A |    |",
  "+---B--+",
  "  |      x",
  "  |      |",
  "  +---D--+"
];

const matrix3 = [
  "@---A---+",
  "        |",
  "x-B-+   |",
  "    |   |",
  "    +---C"
];

const matrix4 = [
  "    +-O-N-+",
  "    |     |",
  "    |   +-I-+",
  "@-G-O-+ | | |",
  "    | | +-+ E",
  "    +-+     S",
  "            |",
  "            x"
];

const matrix5 = [
  " +-L-+",
  " |  +A-+",
  "@B+ ++ H",
  " ++    x"
];

const matrix6 = [
  "@-A--+",
  "     |",
  "     +-B--x-C--D"
];

const matrix7 = [ // Missing start character
  "   -A---+",
  "        |",
  "x-B-+   C",
  "    |   |",
  "    +---+"
];

const matrix8 = [ // Missing end character
  "@--A---+",
  "       |",
  " B-+   C",
  "   |   |",
  "   +---+"
];

const matrix9 = [ // Multiple starts
  " @--A-@-+",
  "        |",
  "x-B-+   C",
  "    |   |",
  "    +---+"
];

const matrix10 = [ // Multiple starts
  "@--A---+",
  "       |",
  "       C",
  "       x",
  "   @-B-+"
];

const matrix11 = [ // Multiple starts
  " @--A--x",
  "      ",
  "x-B-+",
  "    |",
  "    @"
];

const matrix12 = [ // Fork in path
  "      x-B",
  "        |",
  " @--A---+",
  "        |",
  "   x+   C",
  "    |   |",
  "    +---+"
];

const matrix13 = [ // Broken path
  "@--A-+",
  "     |",
  "     ",
  "     B-x"
];

const matrix14 = [ // Multiple starting paths
  "x-B-@-A-x"
];

const matrix15 = [ // Fake turn
  "@-A-+-B-x"
];

module.exports = {
  matrix,
  matrix2,
  matrix3,
  matrix4,
  matrix5,
  matrix6,
  matrix7,
  matrix8,
  matrix9,
  matrix10,
  matrix11,
  matrix12,
  matrix13,
  matrix14,
  matrix15,
};
