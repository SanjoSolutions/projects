import { createBinaryTreeGraph } from "./createBinaryTreeGraph.js";

const min = 1;
const max = 7;
const step = 1;
const showLabels = false;

async function main() {
  const binaryTreeGraph = createBinaryTreeGraph({ min, max, step, showLabels });
  document.body.appendChild(binaryTreeGraph);
}

document.addEventListener("DOMContentLoaded", main);
