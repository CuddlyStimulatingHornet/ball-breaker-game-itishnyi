const pixelSize = 20;
const pixelCountX = Math.floor(canvasWidth / pixelSize);
const pixelCountY = Math.floor(canvasHeight / pixelSize);

console.log(pixelCountX, pixelCountY);

const drawPixel = ({ x, y }) => {
  drawRect(x * pixelSize + 1, y * pixelSize + 1, pixelSize - 2, pixelSize - 2);
};

const ballCoords = {
  x: 10,
  y: 10,
};

const ballVelocity = {
  x: 1,
  y: 1,
};

const onInterval = () => {
  clear();

  moveBall();
};

const moveBall = () => {
  ballCoords.x += ballVelocity.x;
  ballCoords.y += ballVelocity.y;

  if (ballCoords.x >= pixelCountX || ballCoords.x <= 0) {
    ballVelocity.x = -ballVelocity.x;
  }

  if (ballCoords.y >= pixelCountY || ballCoords.y <= 0) {
    ballVelocity.y = -ballVelocity.y;
  }

  drawPixel(ballCoords);
};

setInterval(onInterval, 100);
