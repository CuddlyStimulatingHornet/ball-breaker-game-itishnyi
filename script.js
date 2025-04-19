// configs
const pixelSize = 20;
const initBoxRowCount = 7;

const pixelCountX = Math.floor(canvasWidth / pixelSize);
const pixelCountY = Math.floor(canvasHeight / pixelSize);

console.log(pixelCountX, pixelCountY);

const ballCoords = {
  x: 10,
  y: 10,
};
const ballVelocity = {
  x: 1,
  y: 1,
};
const boxes = Array(pixelCountX)
  .fill(null, 0)
  .map(() => {
    return Array(pixelCountY).fill(false, 0);
  });

initBoxes();
setInterval(onInterval, 100);

function drawPixel({ x, y }) {
  drawRect(x * pixelSize + 1, y * pixelSize + 1, pixelSize - 2, pixelSize - 2);
}

function initBoxes() {
  for (const column of boxes) {
    column.fill(true, 0, initBoxRowCount);
  }
}

function drawBoxes() {
  for (let x = 0; x < boxes.length; x++) {
    for (let y = 0; y < boxes[x].length; y++) {
      if (boxes[x][y]) {
        drawPixel({ x, y });
      }
    }
  }
}

function moveBall() {
  ballCoords.x += ballVelocity.x;
  ballCoords.y += ballVelocity.y;
}

function updateBallVelocity() {
  if (ballCoords.x >= pixelCountX - 1 || ballCoords.x <= 0) {
    ballVelocity.x = -ballVelocity.x;
  }
  if (ballCoords.y >= pixelCountY - 1 || ballCoords.y <= 0) {
    ballVelocity.y = -ballVelocity.y;
  }

  const neighborVertical = {
    x: ballCoords.x,
    y: ballCoords.y + ballVelocity.y,
  };
  const neighborDiagonal = {
    x: ballCoords.x + ballVelocity.x,
    y: ballCoords.y + ballVelocity.y,
  };
  const neighborHorizontal = {
    x: ballCoords.x + ballVelocity.x,
    y: ballCoords.y,
  };
  if (
    hasBox(neighborVertical) ||
    hasBox(neighborDiagonal) ||
    hasBox(neighborHorizontal)
  ) {
    ballVelocity.x = -ballVelocity.x;
    ballVelocity.y = -ballVelocity.y;
  }

  destroyBox(neighborVertical);
  destroyBox(neighborDiagonal);
  destroyBox(neighborHorizontal);
}

function hasBox({ x, y }) {
  return boxes[x][y];
}

function destroyBox({ x, y }) {
  boxes[x][y] = false;
}

function onInterval() {
  clear();
  drawBoxes();
  moveBall();
  updateBallVelocity();
  drawPixel(ballCoords);
}
