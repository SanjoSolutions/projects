const slidingPuzzleLength = 4;
const width = slidingPuzzleLength;
const height = slidingPuzzleLength;
const size = height * width;
let slidingPuzzle = createSlidingPuzzle();

console.log(slidingPuzzleToString(slidingPuzzle));

function createSlidingPuzzle() {
  const slidingPuzzle = new Array(width * height)
    .fill(null)
    .map((value, index) => index);
  slidingPuzzle[0] = null;
  return slidingPuzzle;
}

function slidingPuzzleToString(slidingPuzzle) {
  let output = "";
  for (let row = 0; row < height; row++) {
    output +=
      slidingPuzzle
        .slice(row * width, (row + 1) * width)
        .map(slidingPuzzleValueToString)
        .join(" ") + "\n";
  }
  return output;
}

function slidingPuzzleValueToString(value) {
  return (value === null ? "" : String(value)).padStart(3, " ");
}

function movePiece(slidingPuzzle, indexOrPosition) {
  let index;
  if (typeof indexOrPosition === "object") {
    index = positionToIndex(indexOrPosition);
  } else {
    index = indexOrPosition;
  }
  const emptySlotIndex = slidingPuzzle.indexOf(null);
  slidingPuzzle = [...slidingPuzzle];
  slidingPuzzle[emptySlotIndex] = slidingPuzzle[index];
  slidingPuzzle[index] = null;
  return slidingPuzzle;
}

function isValidMove(fromIndex, toIndex) {
  const fromPosition = indexToPosition(fromIndex);
  const toPosition = indexToPosition(toIndex);
  return (
    (Math.abs(toPosition.row - fromPosition.row) === 1 &&
      Math.abs(toPosition.column - fromPosition.column) === 0) ||
    (Math.abs(toPosition.row - fromPosition.row) === 0 &&
      Math.abs(toPosition.column - fromPosition.column) === 1)
  );
}

function shuffleTimes(slidingPuzzle, numberOfTimes) {
  for (let shuffleNumber = 1; shuffleNumber <= numberOfTimes; shuffleNumber++) {
    slidingPuzzle = shuffle(slidingPuzzle);
  }
  return slidingPuzzle;
}

let lastShuffleToIndex = null;

function shuffle(slidingPuzzle) {
  const emptySlotIndex = slidingPuzzle.indexOf(null);
  const movableIndexes = series(0, slidingPuzzle.length - 1).filter(
    (index) =>
      index !== lastShuffleToIndex && isValidMove(index, emptySlotIndex)
  );
  const index =
    movableIndexes[Math.floor(Math.random() * movableIndexes.length)];
  slidingPuzzle = movePiece(slidingPuzzle, index);
  lastShuffleToIndex = emptySlotIndex;
  return slidingPuzzle;
}

function indexToPosition(index) {
  return {
    row: Math.floor(index / width),
    column: index % width,
  };
}

function positionToIndex(position) {
  return position.row * width + position.column;
}

function isValidPosition(position) {
  return isValidRow(position.row) && isValidColumn(position.column);
}

function isValidRow(row) {
  return row >= 0 && row < width;
}

function isValidColumn(column) {
  return column >= 0 && column < height;
}

const solvedSlidingPuzzle = createSlidingPuzzle();
function isSolved(slidingPuzzle) {
  return areArraysEqual(slidingPuzzle, solvedSlidingPuzzle);
}

function areArraysEqual(a, b) {
  if (a.length !== b.length) {
    return false;
  }

  return a.every((item, index) => item === b[index]);
}

async function renderSlidingPuzzle(slidingPuzzle) {
  const image = await loadImage("images/cat.jpg");
  let scaledWidth;
  let scaledHeight;
  if (image.naturalWidth < image.naturalHeight) {
    scaledWidth = 256;
    scaledHeight = Math.round(
      (scaledWidth / image.naturalWidth) * image.naturalHeight
    );
  } else {
    scaledHeight = 256;
    scaledWidth = Math.round(
      (scaledHeight / image.naturalHeight) * image.naturalWidth
    );
  }
  const $slidingPuzzle = document.createElement("div");
  $slidingPuzzle.classList.add("sliding-puzzle");
  for (const value of slidingPuzzle) {
    if (value !== null) {
      const $slidingPuzzlePiece = document.createElement("div");
      $slidingPuzzlePiece.classList.add(
        "sliding-puzzle__piece",
        `sliding-puzzle__piece--top-right-${value}`
      );
      // $slidingPuzzlePiece.innerText = value
      $slidingPuzzlePiece.setAttribute("data-value", value);
      $slidingPuzzlePiece.style.backgroundSize = `${scaledWidth}px ${scaledHeight}px`;
      $slidingPuzzle.appendChild($slidingPuzzlePiece);
    }
  }
  return $slidingPuzzle;
}

async function loadImage(url) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => {
      resolve(image);
    };
    image.src = url;
  });
}

function series(fromNumberInclusive, toNumberInclusive) {
  const values = [];
  for (let value = fromNumberInclusive; value <= toNumberInclusive; value++) {
    values.push(value);
  }
  return values;
}

function wait(numberOfSeconds) {
  return new Promise((resolve) => setTimeout(resolve, numberOfSeconds * 1000));
}

async function main() {
  const $slidingPuzzle = await renderSlidingPuzzle(slidingPuzzle);

  const $slidingPuzzlePieces = Array.from($slidingPuzzle.children);

  function updatePositions() {
    for (const $slidingPuzzlePiece of $slidingPuzzlePieces) {
      let className = "sliding-puzzle__piece";
      const value = Number($slidingPuzzlePiece.getAttribute("data-value"));
      const slotIndex = slidingPuzzle.indexOf(value);
      className += ` sliding-puzzle__piece--top-right-${value}`;
      className += ` sliding-puzzle__piece--position-${slotIndex}`;
      $slidingPuzzlePiece.className = className;
    }
  }

  async function animatedShuffle() {
    const numberOfShuffles = 100;
    for (
      let shuffleNumber = 1;
      shuffleNumber <= numberOfShuffles;
      shuffleNumber++
    ) {
      slidingPuzzle = shuffle(slidingPuzzle);
      updatePositions();
      await wait(1);
    }
  }

  updatePositions();
  document.body.appendChild($slidingPuzzle);
  // await animatedShuffle()
  const numberOfShuffles = 200;
  slidingPuzzle = shuffleTimes(slidingPuzzle, numberOfShuffles);
  updatePositions();

  let zIndex = 1;
  /*
  $slidingPuzzle.addEventListener('click', (event) => {
    const target = event.target
    if (target.classList.contains('sliding-puzzle__piece')) {
      const $slidingPuzzlePiece = target
      const value = Number($slidingPuzzlePiece.getAttribute('data-value'))
      const slotIndex = slidingPuzzle.indexOf(value)
      const emptySlotIndex = slidingPuzzle.indexOf(null)
      if (isValidMove(slotIndex, emptySlotIndex)) {
        slidingPuzzle = movePiece(slidingPuzzle, slotIndex)
        console.log(slidingPuzzleToString(slidingPuzzle))
        $slidingPuzzlePiece.style.zIndex = zIndex
        zIndex++
        updatePositions()
      }
    }
  })
  */

  let $movingSlidingPuzzlePiece;
  let initialOffsetX;
  let initialOffsetY;
  let lastMousePosition;
  $slidingPuzzle.addEventListener("mousedown", (event) => {
    const target = event.target;
    if (target.classList.contains("sliding-puzzle__piece")) {
      const $slidingPuzzlePiece = target;
      const value = Number($slidingPuzzlePiece.getAttribute("data-value"));
      const slotIndex = slidingPuzzle.indexOf(value);
      const emptySlotIndex = slidingPuzzle.indexOf(null);
      if (isValidMove(slotIndex, emptySlotIndex)) {
        $movingSlidingPuzzlePiece = $slidingPuzzlePiece;
        initialOffsetX = $movingSlidingPuzzlePiece.offsetLeft;
        initialOffsetY = $movingSlidingPuzzlePiece.offsetTop;
        $movingSlidingPuzzlePiece.classList.add(
          "sliding-puzzle__piece--moving"
        );
        lastMousePosition = {
          x: event.pageX,
          y: event.pageY,
        };
      }
    }
  });

  function extracted(
    $movingSlidingPuzzlePiece,
    initialOffsetX,
    initialOffsetY
  ) {
    let translateX = $movingSlidingPuzzlePiece.offsetLeft - initialOffsetX;
    let translateY = $movingSlidingPuzzlePiece.offsetTop - initialOffsetY;

    const value = Number($movingSlidingPuzzlePiece.getAttribute("data-value"));
    const slotIndex = slidingPuzzle.indexOf(value);
    const emptySlotIndex = slidingPuzzle.indexOf(null);
    const slotPosition = indexToPosition(slotIndex);
    const emptySlotPosition = indexToPosition(emptySlotIndex);
    const minimumTranslateX =
      emptySlotPosition.column < slotPosition.column ? -64 : 0;
    const maximumTranslateX =
      emptySlotPosition.column > slotPosition.column ? 64 : 0;
    const minimumTranslateY =
      emptySlotPosition.row < slotPosition.row ? -64 : 0;
    const maximumTranslateY = emptySlotPosition.row > slotPosition.row ? 64 : 0;
    return {
      translateX,
      translateY,
      slotIndex,
      minimumTranslateX,
      maximumTranslateX,
      minimumTranslateY,
      maximumTranslateY,
    };
  }

  window.addEventListener("mousemove", (event) => {
    if ($movingSlidingPuzzlePiece) {
      let {
        translateX,
        translateY,
        minimumTranslateX,
        maximumTranslateX,
        minimumTranslateY,
        maximumTranslateY,
      } = extracted($movingSlidingPuzzlePiece, initialOffsetX, initialOffsetY);

      const mousePosition = {
        x: event.pageX,
        y: event.pageY,
      };
      const deltaX = mousePosition.x - lastMousePosition.x;
      const deltaY = mousePosition.y - lastMousePosition.y;
      translateX += deltaX;
      translateY += deltaY;
      translateX = Math.max(
        minimumTranslateX,
        Math.min(translateX, maximumTranslateX)
      );
      translateY = Math.max(
        minimumTranslateY,
        Math.min(translateY, maximumTranslateY)
      );

      $movingSlidingPuzzlePiece.style.left = initialOffsetX + translateX + "px";
      $movingSlidingPuzzlePiece.style.top = initialOffsetY + translateY + "px";

      lastMousePosition = mousePosition;
    }
  });

  window.addEventListener("mouseup", (event) => {
    if ($movingSlidingPuzzlePiece) {
      let {
        translateX,
        translateY,
        slotIndex,
        minimumTranslateX,
        maximumTranslateX,
        minimumTranslateY,
        maximumTranslateY,
      } = extracted($movingSlidingPuzzlePiece, initialOffsetX, initialOffsetY);

      function hasMoved() {
        return (
          (minimumTranslateX !== 0 && translateX === minimumTranslateX) ||
          (minimumTranslateY !== 0 && translateY === minimumTranslateY) ||
          (maximumTranslateX !== 0 && translateX === maximumTranslateX) ||
          (maximumTranslateY !== 0 && translateY === maximumTranslateY)
        );
      }

      if (hasMoved()) {
        slidingPuzzle = movePiece(slidingPuzzle, slotIndex);
        updatePositions();
      }
      $movingSlidingPuzzlePiece.classList.remove(
        "sliding-puzzle__piece--moving"
      );
      $movingSlidingPuzzlePiece.style.left = null;
      $movingSlidingPuzzlePiece.style.top = null;
      $movingSlidingPuzzlePiece = null;
    }
  });

  async function doMoves(moves) {
    for (const move of moves) {
      slidingPuzzle = movePiece(slidingPuzzle, move);
      updatePositions();
      await wait(1);
    }
  }

  solve(slidingPuzzle, numberOfShuffles, doMoves);
}

document.addEventListener("DOMContentLoaded", main);

class Node {
  constructor(slidingPuzzle, depth, move = null, parent = null) {
    this.slidingPuzzle = slidingPuzzle;
    this.depth = depth;
    this.move = move;
    this.parent = parent;
    this.children = [];
    this.manhattanDistance = manhattanDistance(slidingPuzzle);
    this.hasBeenVisited = false;
  }
}

async function solve(slidingPuzzle, maxDepth, doMoves) {
  debugger;
  console.log("Finding solution...");
  const solution = findSolution(slidingPuzzle, maxDepth);
  if (solution) {
    console.log("Solution found:", solution);
    await doMoves(solution);
  } else {
    console.log("No solution found.");
  }
}

function findSolution(slidingPuzzle, maxDepth) {
  const tree = new Node(slidingPuzzle, 0);
  // console.log(tree.manhattanDistance)
  if (evaluateIfSolved(tree)) {
    return [];
  }
  let node = tree;
  node.hasBeenVisited = true;
  while (true) {
    if (!node) {
      return null;
    }
    if (node.children.length === 0) {
      generateChildren(node);
    }
    node = selectNextNodeToVisit(node);
    if (!node) {
      return null;
    }
    node.hasBeenVisited = true;
    // console.log(node.manhattanDistance)
    if (evaluateIfSolved(node)) {
      const moves = generateMovesForSolution(node);
      return moves;
    } else {
      if (node.depth === maxDepth) {
        // console.log('Reached max depth. Going up.')
        let previousNode;
        do {
          previousNode = node;
          node = node.parent;
        } while (node && !hasUnvisitedNonLeafChildren(node, maxDepth));
        previousNode.children = []; // Save memory
        // console.log('Node depth: ' + node.depth)
      }
    }
  }
}

function hasUnvisitedNonLeafChildren(node, maxDepth) {
  return node.children.some(
    (child) => child.depth < maxDepth && isUnvisited(child)
  );
}

function selectNextNodeToVisit(node) {
  const candidates = node.children
    .filter(isUnvisited)
    .sort(compareManhattanDistance);
  if (candidates.length === 0) {
    return null;
  }
  const nextNodeToVisit = candidates[0];
  return nextNodeToVisit;
}

function hasUnvisitedChildren(node) {
  return node.children.some(isUnvisited);
}

function isUnvisited(node) {
  return !node.hasBeenVisited && node.children.length === 0;
}

function hasBeenVisited(node) {
  return node.hasBeenVisited || node.children.length >= 1;
}

function compareManhattanDistance(a, b) {
  return a.manhattanDistance - b.manhattanDistance;
}

function manhattanDistance(slidingPuzzle) {
  return sum(
    range(0, size).map((index) => pieceManhattanDistance(slidingPuzzle, index))
  );
}

function sum(values) {
  return values.reduce((sum, value) => sum + value);
}

function range(from, to) {
  const range = new Array();
  for (let i = from; i < to; i++) {
    range.push(i);
  }
  return range;
}

function pieceManhattanDistance(slidingPuzzle, index) {
  let piece = slidingPuzzle[index];
  if (piece === null) {
    piece = 0;
  }
  const position = indexToPosition(index);
  const c = indexToPosition(piece);
  return Math.abs(position.row - c.row) + Math.abs(position.column - c.column);
}

function allChildren(nodes) {
  const children = [];
  for (const node of nodes) {
    Array.prototype.push.apply(children, node.children);
  }
  return children;
}

function generateMovesForSolution(nodeWithSolution) {
  const moves = [];
  let node = nodeWithSolution;
  do {
    const move = node.move;
    if (move !== null) {
      moves.unshift(move);
    }
    node = node.parent;
  } while (node);
  return moves;
}

function generateChildren(node) {
  const slidingPuzzle = node.slidingPuzzle;
  const emptySlotIndex = determineEmptySlotIndex(slidingPuzzle);
  const indexesOfPiecesThatCanBeMovedIntoEmptySlot = determineIndexesOfPiecesThatCanBeMovedIntoSlot(
    slidingPuzzle,
    emptySlotIndex
  );
  let indexesOfPiecesToConsiderThatCanBeMovedIntoEmptySlot;
  if (node.parent) {
    const emptySlotIndex = determineEmptySlotIndex(node.parent.slidingPuzzle);
    indexesOfPiecesToConsiderThatCanBeMovedIntoEmptySlot = indexesOfPiecesThatCanBeMovedIntoEmptySlot.filter(
      (index) => index != emptySlotIndex
    );
  } else {
    indexesOfPiecesToConsiderThatCanBeMovedIntoEmptySlot = indexesOfPiecesThatCanBeMovedIntoEmptySlot;
  }
  for (const index of indexesOfPiecesToConsiderThatCanBeMovedIntoEmptySlot) {
    const child = new Node(
      movePiece(slidingPuzzle, index),
      node.depth + 1,
      index,
      node
    );
    node.children.push(child);
  }
}

function evaluateIfSolved(node) {
  return node.manhattanDistance === 0;
}

function determineEmptySlotIndex(slidingPuzzle) {
  return slidingPuzzle.indexOf(null);
}

function determineEmptySlotPosition(slidingPuzzle) {
  return indexToPosition(determineEmptySlotIndex(slidingPuzzle));
}

function determineIndexesOfPiecesThatCanBeMovedIntoSlot(
  slidingPuzzle,
  slotIndex
) {
  const slotPosition = indexToPosition(slotIndex);

  const potentialPositionsThatCanBeMovedIntoSlot = [
    { row: slotPosition.row - 1, column: slotPosition.column },
    { row: slotPosition.row, column: slotPosition.column + 1 },
    { row: slotPosition.row + 1, column: slotPosition.column },
    { row: slotPosition.row, column: slotPosition.column - 1 },
  ];

  const positionsOfPiecesThatCanBeMovedIntoSlot = potentialPositionsThatCanBeMovedIntoSlot.filter(
    isValidPosition
  );

  const indexesOfPiecesThatCanBeMovedIntoSlot = positionsOfPiecesThatCanBeMovedIntoSlot.map(
    positionToIndex
  );

  return indexesOfPiecesThatCanBeMovedIntoSlot;
}

function flatten(array) {
  return Array.prototype.concat.apply([], array);
}

function solve2(slidingPuzzle) {
  const subgames = generateSubgames();
  for (const subgame of subgames) {
    slidingPuzzle = solveSubgame(slidingPuzzle, subgame);
  }
}

function generateSubgames() {
  const subgames = [];
  for (let columnToSolve = width - 1; columnToSolve >= 2; columnToSolve--) {
    const subgame = {
      pieceIndexesToPutInPlace: pieceIndexesInColumn(
        columnToSolve,
        (width - 1 - columnToSolve) % 2 == 0
          ? Direction.FromTopToBottom
          : Direction.FromBottomToTop
      ),
      areaThatCanBeUsed: {
        fromRow: 0,
        toRow: height,
        fromColumn: 0,
        toColumn: columnToSolve,
      },
    };
    subgames.push(subgame);
  }
  const subgame = {
    pieceIndexesToPutInPlace: pieceIndexesInColumn(
      1,
      Direction.FromTopToBottom
    ).concat(pieceIndexesInColumn(0, Direction.FromBottomToTop)),
    areaThatCanBeUsed: {
      fromRow: 0,
      toRow: height,
      fromColumn: 0,
      toColumn: 2,
    },
  };
  subgames.push(subgame);
  return subgames;
}

const Direction = {
  FromTopToBottom: 1,
  FromBottomToTop: 2,
};

function pieceIndexesInColumn(column, direction = Direction.FromTopToBottom) {
  switch (direction) {
    case Direction.FromTopToBottom:
      return pieceIndexesInColumnFromTopToBottom(column);
    case Direction.FromBottomToTop:
      return pieceIndexesInColumnFromBottomToTop(column);
  }
}

function pieceIndexesInColumnFromTopToBottom(column) {
  const pieceIndexes = [];
  for (let row = 0; row < height; row++) {
    const position = { row, column };
    const index = positionToIndex(position);
    if (index !== 0) {
      pieceIndexes.push(index);
    }
  }
  return pieceIndexes;
}

function pieceIndexesInColumnFromBottomToTop(column) {
  const pieceIndexes = [];
  for (let row = height - 1; row >= 0; row--) {
    const position = { row, column };
    const index = positionToIndex(position);
    if (index !== 0) {
      pieceIndexes.push(index);
    }
  }
  return pieceIndexes;
}

function solveSubgame(slidingPuzzle, subgame) {
  return putPiecesInPlace(slidingPuzzle, subgame);
}

function putPiecesInPlace(slidingPuzzle, subgame) {}

function moveFromIndexToIndex(slidingPuzzle, fromIndex, toIndex) {
  const fromPosition = indexToPosition(fromIndex);
  const toPosition = indexToPosition(toIndex);
  if (isInQuarterWithEmptySlot(slidingPuzzle, fromPosition, toPosition)) {
    const quarter = determineSectionWithEmptySlot(
      slidingPuzzle,
      fromPosition,
      toPosition
    );
    slidingPuzzle = rotateQuarterWithEmptySlot(
      slidingPuzzle,
      quarter,
      countNumberOfMovesToMovePieceFromPositionToPositionInQuarterWithEmptySlot(
        slidingPuzzle,
        quarter,
        fromPosition,
        toPosition
      )
    );
  }
  // for (let length = 2; length <= slidingPuzzleLength; length++) {
  //   if (isInSectionWithEmptySlot(
  //     slidingPuzzle,
  //     fromPosition,
  //     toPosition,
  // }
  return slidingPuzzle;
}

function rotateQuarterWithEmptySlot(
  slidingPuzzle,
  { fromRow, toRow, fromColumn, toColumn },
  numberOfMoves = 1
) {
  const rotationQuarterPositions = generateRotationQuarterPositions({
    fromRow,
    toRow,
    fromColumn,
    toColumn,
  });
  const emptySlotRotationQuarterPositionsIndex = rotationQuarterPositions.find(
    isEmptySlot
  );
  let nextSlotToMoveRotationQuarterPositionsIndex =
    (emptySlotRotationQuarterPositionsIndex + 1) %
    rotationQuarterPositions.length;
  for (let moveNumber = 1; moveNumber <= numberOfMoves; moveNumber++) {
    slidingPuzzle = movePiece(
      slidingPuzzle,
      rotationQuarterPositions[nextSlotToMoveRotationQuarterPositionsIndex]
    );
    nextSlotToMoveRotationQuarterPositionsIndex =
      (nextSlotToMoveRotationQuarterPositionsIndex + 1) %
      rotationQuarterPositions.length;
  }
  return slidingPuzzle;
}

function countNumberOfMovesToMovePieceFromPositionToPositionInQuarterWithEmptySlot(
  slidingPuzzle,
  { fromRow, toRow, fromColumn, toColumn },
  fromPosition,
  toPosition
) {
  const rotationQuarterPositions = generateRotationQuarterPositions({
    fromRow,
    toRow,
    fromColumn,
    toColumn,
  });
  const fromPositionIndex = rotationQuarterPositions.find(
    isEqualPosition.bind(null, fromPosition)
  );
  const toPositionIndex = rotationQuarterPositions.find(
    isEqualPosition.bind(null, toPosition)
  );
  if (toPositionIndex >= fromPositionIndex) {
    return toPositionIndex - fromPositionIndex;
  } else {
    return (
      rotationQuarterPositions.length - fromPositionIndex + toPositionIndex
    );
  }
}

function isEqualPosition(a, b) {
  return a.row === b.row && a.column === b.column;
}

function generateRotationQuarterPositions({
  fromRow,
  toRow,
  fromColumn,
  toColumn,
}) {
  return [
    { row: fromRow, column: fromColumn },
    { row: fromRow, column: toColumn },
    { row: toRow, column: fromColumn },
    { row: toRow, column: toColumn },
  ];
}

function isInQuarterWithEmptySlot(slidingPuzzle, fromPosition, toPosition) {
  const emptySlotPosition = determineEmptySlotPosition(slidingPuzzle);
  return (
    arePositionsInAdjacentingOrSameRowsAndColumns(fromPosition, toPosition) &&
    arePositionsInAdjacentingOrSameRowsAndColumns(
      fromPosition,
      emptySlotPosition
    ) &&
    arePositionsInAdjacentingOrSameRowsAndColumns(toPosition, emptySlotPosition)
  );
}

function determineSectionWithEmptySlot(
  slidingPuzzle,
  fromPosition,
  toPosition
) {
  const emptySlotPosition = determineEmptySlotPosition(slidingPuzzle);
  return determineSection([fromPosition, toPosition, emptySlotPosition]);
}

function determineSection(positions) {
  const rows = positions.map((position) => position.row);
  const columns = positions.map((position) => position.column);
  return {
    fromRow: Math.min(...rows),
    toRow: Math.max(...rows),
    fromColumn: Math.min(...columns),
    toColumn: Math.max(...columns),
  };
}

function arePositionsInAdjacentingOrSameRowsAndColumns(a, b) {
  return Math.abs(a.row - b.row) <= 1 && Math.abs(a.column - b.column) <= 1;
}

function isEmptySlot(slidingPuzzle, position) {
  return slidingPuzzle[positionToIndex(position)] === null;
}
