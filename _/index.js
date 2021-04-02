import { createFullDocumentCanvas } from "../createFullDocumentCanvas.js";

async function main() {
  const { canvas, context } = createFullDocumentCanvas();
  document.body.appendChild(canvas);

  const width = canvas.width / window.devicePixelRatio;
  const height = canvas.height / window.devicePixelRatio;

  const a = { x: 50, y: 50 };
  const b = { x: 150, y: 100 };
  drawPoint(a);
  drawPoint(b);
  drawLine(a, b);
  const c = { x: b.x, y: a.y };
  drawLine(a, c);
  drawLine(c, b);
  drawAngle(a, b);

  function drawPoint({ x, y }) {
    const radius = 1.5;
    context.fillRect(x - radius, inverseYAxis(y) - radius, 3, 3);
  }

  function drawLine(a, b) {
    context.beginPath();
    context.moveTo(a.x, inverseYAxis(a.y));
    context.lineTo(b.x, inverseYAxis(b.y));
    context.stroke();
  }

  function drawAngle(a, b) {
    context.beginPath();
    const radius = 20;
    const alpha = 2 * Math.PI - angle(a, b);
    context.arc(a.x, inverseYAxis(a.y), radius, 0, alpha, true);
    context.stroke();
    const d = {
      x: a.x + radius * Math.cos(alpha),
      y: a.y - radius * Math.sin(alpha),
    };
    const beta = alpha + (1 / 4) * (2 * Math.PI);
    const l = 3;
    const l2 = 2;
    const a5 = {
      x: d.x + l * Math.cos(beta),
      y: d.y - l * Math.sin(beta),
    };
    const a51alpha = beta - (1 / 4) * (2 * Math.PI);
    const a51 = {
      x: a5.x + l2 * Math.cos(a51alpha),
      y: a5.y - l2 * Math.sin(a51alpha),
    };
    const a52alpha = beta + (1 / 4) * (2 * Math.PI);
    const a52 = {
      x: a5.x + l2 * Math.cos(a52alpha),
      y: a5.y - l2 * Math.sin(a52alpha),
    };

    context.beginPath();
    context.moveTo(d.x, inverseYAxis(d.y));
    context.lineTo(a51.x, inverseYAxis(a51.y));
    context.stroke();

    context.beginPath();
    context.moveTo(d.x, inverseYAxis(d.y));
    context.lineTo(a52.x, inverseYAxis(a52.y));
    context.stroke();

    const l34height = 10;
    const alpha3000 = 2 * Math.PI - 0.5 * angle(a, b);
    const radius300 = 0.5 * radius;
    const point300000 = {
      x: a.x + radius300 * Math.cos(alpha3000),
      y: a.y - radius300 * Math.sin(alpha3000) + l34height,
    };
    context.fillRect(point300000.x, inverseYAxis(point300000.y), 1, l34height);

    const text0 = radianToDegree(angle(a, b)).toFixed(0);
    const text = `${text0}°`;
    const m = context.measureText(text0);
    const text0Width = m.actualBoundingBoxLeft + m.actualBoundingBoxRight;
    context.beginPath();
    context.fillText(
      text,
      point300000.x - 0.5 * text0Width,
      inverseYAxis(point300000.y + 3)
    );
  }

  function drawAngleA(alpha) {
    context.beginPath();
    context.arc(100, 100, 30, 0, alpha, false);
    context.stroke();
  }

  function inverseYAxis(y) {
    return height - y;
  }

  function angle(a, b) {
    return Math.atan2(b.y - a.y, b.x - a.x);
  }

  function radianToDegree(x) {
    return x / ((2 * Math.PI) / 360);
  }

  function degreeToRadian(alpha) {
    return alpha * ((2 * Math.PI) / 360);
  }
}

document.addEventListener("DOMContentLoaded", main);
