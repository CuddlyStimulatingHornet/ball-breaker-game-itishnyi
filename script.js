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

  if (ballCoords.x >= pixelCountX || ballCoords.x <= 0) {
    ballVelocity.x = -ballVelocity.x;
  }

  if (ballCoords.y >= pixelCountY || ballCoords.y <= 0) {
    ballVelocity.y = -ballVelocity.y;
  }
}

function onInterval() {
  clear();
  drawBoxes();
  moveBall();
  drawPixel(ballCoords);
}
