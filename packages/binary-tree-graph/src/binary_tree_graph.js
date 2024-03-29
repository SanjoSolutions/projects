import { createBinaryTreeGraph } from "./createBinaryTreeGraph.js"

const min = 0
const max = 1000
const step = 100

async function main() {
  const binaryTreeGraph = createBinaryTreeGraph({ min, max, step })
  document.body.appendChild(binaryTreeGraph)
}

document.addEventListener("DOMContentLoaded", main)
