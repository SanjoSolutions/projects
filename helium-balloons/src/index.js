import { animate } from "@sanjo/animate";
import { randomInteger } from "../../randomInteger.js";
import { randomFloat } from "../../randomFloat.js";
import { randomColor } from "../../randomColor.js";
import { colorToString } from "../../colorToString.js";
import { createFullDocumentCanvas } from "@sanjo/canvas";

const balloonRadiusX = 0.125 * (375 / 2);
const balloonRadiusY = 0.125 * (474 / 2);
const balloonLineLength = 2.5 * balloonRadiusY;

const windAngle = 0;
const windSpeed = 3;

// waste no time
const { canvas, context } = createFullDocumentCanvas();
document.body.appendChild(canvas);

let numberOfBalloonsThatHaveBeenPopped = 0;
let numberOfBalloonsToCreate = 1;
let balloons = [];
createBalloons();

animate((elapsedTime) => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (const balloon of balloons) {
    paintBalloon(balloon);
  }

  for (const balloon of balloons) {
    balloon.y += balloon.speed * (elapsedTime / 1000);
    // wind
    balloon.x += windSpeed * (elapsedTime / 1000) * Math.cos(windAngle);
    balloon.y += windSpeed * (elapsedTime / 1000) * Math.sin(windAngle);
  }

  const documentWidth = window.innerWidth;
  const documentHeight = window.innerHeight;
  const minX = -balloonRadiusX;
  const maxX = documentWidth + balloonRadiusX;
  const minY = -balloonRadiusY;
  const maxY = documentHeight + balloonRadiusY + balloonLineLength;
  balloons = balloons.filter(
    ({ x, y }) => minX <= x && x <= maxX && minY <= y && y <= maxY
  );
});

setInterval(() => {
  createBalloon();
}, 5000);

canvas.addEventListener("mousedown", (event) => {
  const documentHeight = window.innerHeight;
  const x = event.offsetX;
  const y = documentHeight - event.offsetY;
  const balloonIndex = balloons.findIndex(
    (balloon) =>
      balloon.x - balloonRadiusX <= x &&
      x <= balloon.x + balloonRadiusX &&
      balloon.y - balloonRadiusY <= y &&
      y <= balloon.y + balloonRadiusY
  );
  if (balloonIndex !== -1) {
    balloons.splice(balloonIndex, 1);
    numberOfBalloonsThatHaveBeenPopped++;
    numberOfBalloonsToCreate =
      1 + Math.floor(numberOfBalloonsThatHaveBeenPopped / 10);
    createBalloons();
  }
});

function createBalloons() {
  for (let i = 0; i < numberOfBalloonsToCreate; i++) {
    createBalloon();
  }
}

function createBalloon() {
  const documentWidth = window.innerWidth;
  const color = randomColor();
  color.saturation = 0.9;
  color.alpha = 0.9;
  const balloon = {
    x: randomInteger(balloonRadiusX, documentWidth - 1 - balloonRadiusX),
    y: -balloonRadiusY,
    color: colorToString(color),
    speed: randomFloat(5, 10),
  };
  balloons.push(balloon);
}

const balloonShape = createBalloonShape();

function paintBalloon({ x, y, color }) {
  context.fillStyle = color;
  const documentHeight = window.innerHeight;
  paintShape(
    {
      x,
      y: documentHeight - y,
    },
    balloonShape
  );
}

function paintShape({ x, y }, shape) {
  context.save();
  const devicePixelRatio = window.devicePixelRatio;
  context.translate(x, y);
  context.fill(balloonShape);
  context.stroke(balloonShape);
  context.restore();
}

function createBalloonShape() {
  const shape = new Path2D();

  shape.ellipse(0, 0, balloonRadiusX, balloonRadiusY, 0, 0, 2 * Math.PI);

  shape.moveTo(0, balloonRadiusY);
  shape.lineTo(0, balloonRadiusY + balloonLineLength);

  return shape;
}
