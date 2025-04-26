// configs
const pixelSize = 20;
const initBoxRowCount = 3;
const interval = 10;

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
setInterval(onInterval, interval);

function drawPixel({ x, y }, color = "red") {
  drawRect(
    x * pixelSize + 1,
    y * pixelSize + 1,
    pixelSize - 2,
    pixelSize - 2,
    color
  );
}

function drawBall() {
  drawPixel(ballCoords, "green");
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

function getNeighbours() {
  const neighbourVertical = {
    x: ballCoords.x,
    y: ballCoords.y + ballVelocity.y,
  };
  const neighbourDiagonal = {
    x: ballCoords.x + ballVelocity.x,
    y: ballCoords.y + ballVelocity.y,
  };
  const neighbourHorizontal = {
    x: ballCoords.x + ballVelocity.x,
    y: ballCoords.y,
  };

  return {
    vertical: neighbourVertical,
    diagonal: neighbourDiagonal,
    horizontal: neighbourHorizontal,
  };
}

function updateBallVelocity(n) {
  if (ballCoords.x >= pixelCountX - 1 || ballCoords.x <= 0) {
    ballVelocity.x = -ballVelocity.x;
  }
  if (ballCoords.y >= pixelCountY - 1 || ballCoords.y <= 0) {
    ballVelocity.y = -ballVelocity.y;
  }

  if (hasBox(n.vertical) || hasBox(n.diagonal) || hasBox(n.horizontal)) {
    ballVelocity.x = -ballVelocity.x;
    ballVelocity.y = -ballVelocity.y;
  }
}

function destroyNeighbours(n) {
  hasBox(n.vertical) && destroyBox(n.vertical);
  hasBox(n.diagonal) && destroyBox(n.diagonal);
  hasBox(n.horizontal) && destroyBox(n.horizontal);
}

function hasBox({ x, y }) {
  if (boxes[x]) {
    return boxes[x][y];
  }
  return false;
}

function destroyBox({ x, y }) {
  boxes[x][y] = false;
}

function onInterval() {
  clear();
  drawBoxes();

  const neighbours = getNeighbours();
  moveBall();
  updateBallVelocity(neighbours);
  destroyNeighbours(neighbours);
  drawBall();
}
