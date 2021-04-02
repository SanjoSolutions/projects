const width = 4;
const height = 4;
let slidingPuzzle = new Array(width * height);
slidingPuzzle = slidingPuzzle.fill(null).map((value, index) => index);
slidingPuzzle[0] = null;

console.log(slidingPuzzleToString(slidingPuzzle));

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

function movePiece(slidingPuzzle, index) {
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
  // slidingPuzzle = shuffleTimes(slidingPuzzle, 100)
  // updatePositions()

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
}

document.addEventListener("DOMContentLoaded", main);
