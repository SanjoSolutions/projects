import { animate } from "../../animate.js";

export function createLineToLineAnimated({
  width,
  height,
  color,
  backgroundColor,
}) {
  const lineWidth = 0.45 * width;
  const connectionLineWidth = 0.1 * width;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");

  context.strokeStyle = color || "black";
  context.lineWidth = 1;

  const maxOffset = height;
  let offset = 0;
  let offsetDelta = 1;

  function draw() {
    if (backgroundColor) {
      context.fillStyle = backgroundColor;
      context.fillRect(0, 0, width, height);
    } else {
      context.clearRect(0, 0, width, height);
    }

    context.beginPath();
    context.moveTo(0, height - 0.5 * context.lineWidth - offset);
    context.lineTo(lineWidth, height - 0.5 * context.lineWidth - offset);
    context.lineTo(
      lineWidth + connectionLineWidth,
      0.5 * context.lineWidth + offset
    );
    context.lineTo(width, 0.5 * context.lineWidth + offset);
    context.stroke();
  }

  animate((elapsedTime) => {
    offset += (elapsedTime / (1000 / 60)) * offsetDelta;
    if (offset > maxOffset) {
      offset = maxOffset;
    } else if (offset < 0) {
      offset = 0;
    }

    draw();

    if (offset >= maxOffset || offset <= 0) {
      offsetDelta *= -1;
    }
  });

  return {
    get element() {
      return canvas;
    },
  };
}

document.addEventListener("DOMContentLoaded", () => {
  const options = { width: 496, height: 32, color: "yellow" };
  const container = document.createElement("div");
  container.style.width = options.width + "px";
  container.style.padding = "1rem";
  container.style.backgroundColor = "black";
  const lineToLine = createLineToLineAnimated(options);
  container.appendChild(lineToLine.element);
  document.body.appendChild(container);
});
