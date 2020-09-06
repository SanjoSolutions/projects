import { calculateViewport, zoomable } from '../zoomable.js';
import { BinaryTree } from './BinaryTree.js';
import { BinaryTreeNode } from './BinaryTreeNode.js';
import { createRenderableBinaryTree } from './createRenderableBinaryTree.js';

function createFullDocumentCanvas(onDevicePixelRatioOrDocumentSizeChangeFn = noop) {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  setCanvasSizeAndScale()

  listenToDevicePixelRatioChange(onDevicePixelRatioOrDocumentSizeChange)
  window.addEventListener('resize', onDevicePixelRatioOrDocumentSizeChange)

  function setCanvasSizeAndScale() {
    const documentWidth = window.innerWidth
    const documentHeight = window.innerHeight
    const devicePixelRatio = window.devicePixelRatio
    canvas.width = devicePixelRatio * documentWidth
    canvas.height = devicePixelRatio * documentHeight
  }

  function onDevicePixelRatioOrDocumentSizeChange(event) {
    setCanvasSizeAndScale()
    onDevicePixelRatioOrDocumentSizeChangeFn({ canvas, context }, event)
  }

  return { canvas, context }
}

function listenToDevicePixelRatioChange(callback) {
  let mediaQueryList

  function registerDevicePixelRatioChangeListener(onDevicePixelRatioChange) {
    mediaQueryList = matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`)
    mediaQueryList.addEventListener('change', onDevicePixelRatioChange)
  }

  function onDevicePixelRatioChange(event) {
    mediaQueryList.removeEventListener('change', onDevicePixelRatioChange)
    registerDevicePixelRatioChangeListener(onDevicePixelRatioChange)
    callback(event)
  }

  registerDevicePixelRatioChangeListener(onDevicePixelRatioChange)
}

function noop() { }

function createBinaryTree({ min, max, step, showLabels }) {
  if (typeof showLabels === 'undefined') {
    showLabels = true
  }

  const numberOfLeafNodes = 2 ** Math.ceil(Math.log2((max - min + 1) / step))
  const binaryTree = new BinaryTree()

  const numberOfLevels = calculateNumberOfLevels(numberOfLeafNodes)
  let nextLevelNodes = [binaryTree.root]
  let nodes
  for (let levelIndex = 0; levelIndex < numberOfLevels - 1; levelIndex++) {
    nodes = nextLevelNodes
    nextLevelNodes = new Array(2 ** (levelIndex + 1))
    let nextLevelNodesIndex = 0
    for (const node of nodes) {
      const childNode0 = new BinaryTreeNode()
      childNode0.parent = node
      const childNode1 = new BinaryTreeNode()
      childNode1.parent = node
      node.children[0] = childNode0
      node.children[1] = childNode1
      nextLevelNodes[nextLevelNodesIndex] = childNode0
      nextLevelNodesIndex++
      nextLevelNodes[nextLevelNodesIndex] = childNode1
      nextLevelNodesIndex++
    }
  }

  if (showLabels) {
    for (let index = 0; index < numberOfLeafNodes; index++) {
      nextLevelNodes[index].value = min + index * step
    }
  }

  return binaryTree
}

function calculateNumberOfLevels(numberOfLeafNodes) {
  // 2 ** (x-1) = numberOfLeafNodes
  return Math.ceil(Math.log2(numberOfLeafNodes) + 1)
}

function render({ canvas, context }, { binaryTreeRendering, viewportBoundingBox, binaryTreeRenderingBoundingBox, zoom }) {
  context.save()

  context.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  )

  const scale = window.devicePixelRatio * zoom
  debugger
  context.scale(scale, scale)

  context.drawImage(
    binaryTreeRendering,
    viewportBoundingBox.x - binaryTreeRenderingBoundingBox.x,
    viewportBoundingBox.y - binaryTreeRenderingBoundingBox.y,
    scale * viewportBoundingBox.width,
    scale * viewportBoundingBox.height,
    0,
    0,
    window.innerWidth,
    window.innerHeight
  )

  context.restore()
}

function rerenderBinaryTree(binaryTree, { viewportBoundingBox }) {
  const binaryTreeRenderingBoundingBox = calculateBinaryTreeRenderingBoundingBox(
    viewportBoundingBox
  )
  const {
    canvas: binaryTreeRendering,
    totalRenderingWidth,
    totalRenderingHeight
  } = renderBinaryTree(binaryTree, binaryTreeRenderingBoundingBox)
  binaryTreeRenderingBoundingBox.width = Math.min(binaryTreeRenderingBoundingBox.width, totalRenderingWidth)
  binaryTreeRenderingBoundingBox.height = Math.min(binaryTreeRenderingBoundingBox.height, totalRenderingHeight)

  return { binaryTreeRendering, totalRenderingWidth, totalRenderingHeight, binaryTreeRenderingBoundingBox }
}

function calculateBinaryTreeRenderingBoundingBox(viewportBoundingBox) {
  // width <= 65535 && height <= 65535 && width * height <= 16384 * 16384
  // ratio = viewportBoundingBox.width / viewportBoundingBox.height
  // height = width / ratio
  // width * height <= 16384 * 16384
  // width * width / ratio <= 16384 * 16384
  // width = Math.sqrt(16384 * 16384 * ratio)
  // height = width / ratio
  const maxWidth = 65535
  const maxHeight = 65535
  const maxArea = 16384 * 16384
  const ratio = viewportBoundingBox.width / viewportBoundingBox.height
  let width = Math.sqrt(maxArea * ratio)
  let height = width / ratio
  width = Math.min(maxWidth, Math.floor(width))
  height = Math.min(maxHeight, Math.floor(height))
  const extraSpace = {
    width: width - viewportBoundingBox.width,
    height: height - viewportBoundingBox.height
  }
  const extraHorizontalSpace = 0.5 * (width - viewportBoundingBox.width)
  const extraVerticalSpace = 0.5 * (height - viewportBoundingBox.height)
  return {
    x: Math.max(0, viewportBoundingBox.x - extraHorizontalSpace),
    y: Math.max(0, viewportBoundingBox.y - extraVerticalSpace),
    width,
    height,
  }
}

/**
 *
 * @param binaryTree
 * @param boundingBox The boundingBox for the area of the binary tree rendering that should be rendered.
 */
function renderBinaryTree(binaryTree, boundingBox) {
  const renderableBinaryTree = createRenderableBinaryTree(binaryTree)
  const paddingToEdge = 16
  const paddingBetweenNodes = 16
  const nodeRadius = 16

  const numberOfNodes = getNumberOfNodes(renderableBinaryTree)
  const numberOfLevels = numberOfNodes.length
  // console.log('numberOfNodes', numberOfNodes)
  // console.log('numberOfLevel', numberOfLevels)

  const lastLevelNumberOfNodes = numberOfNodes[numberOfLevels - 1]
  const lastLevelWidth = lastLevelNumberOfNodes * 2 * nodeRadius + (lastLevelNumberOfNodes - 1) * paddingBetweenNodes
  const levelWidths = new Array(numberOfLevels)
  levelWidths[numberOfLevels - 1] = lastLevelWidth
  const spaceBetweenNodes = new Array(numberOfLevels)
  spaceBetweenNodes[numberOfLevels - 1] = paddingBetweenNodes
  for (let level = numberOfLevels - 2; level >= 0; level--) {
    const levelWidth = levelWidths[level + 1] - 2 * (nodeRadius + 0.5 * spaceBetweenNodes[level + 1])
    levelWidths[level] = levelWidth
    const numberOfNodes = 2 ** level
    spaceBetweenNodes[level] = numberOfNodes === 1 ? 0 : (levelWidth - numberOfNodes * 2 * nodeRadius) / (numberOfNodes - 1)
  }
  // console.log('levelWidths', levelWidths)
  // console.log('spaceBetweenNodes', spaceBetweenNodes)

  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  const devicePixelRatio = window.devicePixelRatio
  const totalRenderingWidth = devicePixelRatio * (2 * paddingToEdge + lastLevelWidth)
  const totalRenderingHeight = devicePixelRatio * (2 * paddingToEdge + numberOfLevels * 2 * nodeRadius + (numberOfLevels - 1) * paddingBetweenNodes)
  canvas.width = Math.min(boundingBox.width, totalRenderingWidth)
  canvas.height = Math.min(boundingBox.height, totalRenderingHeight)

  context.translate(-boundingBox.x, -boundingBox.y)
  context.scale(devicePixelRatio, devicePixelRatio)

  /*
  const canvasWidth = canvas.width / devicePixelRatio
  const canvasHeight = canvas.height / devicePixelRatio

  context.save()

  context.fillStyle = '#FAFAFA'
  context.fillRect(boundingBox.x / devicePixelRatio, boundingBox.y / devicePixelRatio, canvasWidth, canvasHeight)

  context.beginPath()
  context.rect(boundingBox.x / devicePixelRatio, boundingBox.y / devicePixelRatio, canvasWidth, canvasHeight)
  context.stroke()

  context.restore()
  */

  calculatePositions()
  render()

  function calculatePositions() {
    let nodes = [renderableBinaryTree.root]
    let level = 0
    while (nodes.length >= 1) {
      const numberOfNodes = nodes.length
      const levelWidth = levelWidths[level]
      const spaceBetweenNodesOnLevel = spaceBetweenNodes[level]
      const y = paddingToEdge + nodeRadius + level * (2 * nodeRadius + paddingBetweenNodes)
      for (let index = 0; index < nodes.length; index++) {
        const node = nodes[index]
        let x
        if (numberOfNodes === 1) {
          x = totalRenderingWidth / devicePixelRatio / 2
        } else {
          x = totalRenderingWidth / devicePixelRatio / 2 - 0.5 * levelWidth + nodeRadius + index * (2 * nodeRadius + spaceBetweenNodesOnLevel)
        }
        node.position = {
          x,
          y
        }
      }
      nodes = nodes.map(node => node.children).flat()
      level++
    }
  }

  function render() {
    renderNodes()
    renderConnections()
  }

  function renderNodes() {
    let nodes = [renderableBinaryTree.root]
    let level = 0
    while (nodes.length >= 1) {
      for (let index = 0; index < nodes.length; index++) {
        const node = nodes[index]
        if (isNodeInViewport(node)) {
          context.beginPath()
          context.arc(node.position.x, node.position.y, nodeRadius, 0, 2 * Math.PI)
          context.stroke()
          if (typeof node.value !== 'undefined') {
            let value = node.value
            if (!Number.isInteger(value)) {
              value = value.toFixed(1)
            }
            const textMeasures = context.measureText(value)
            context.fillText(
              value,
              node.position.x - 0.5 * (textMeasures.actualBoundingBoxLeft + textMeasures.actualBoundingBoxRight),
              node.position.y + 0.5 * (textMeasures.actualBoundingBoxAscent + textMeasures.actualBoundingBoxDescent)
            )
          }
        }
      }
      nodes = nodes.map(node => node.children).flat()
    }
  }

  function isNodeInViewport(node) {
    const x = window.devicePixelRatio * node.position.x
    const y = window.devicePixelRatio * node.position.y
    const result = (
      boundingBox.x - nodeRadius <= x && x <= x + canvas.width + nodeRadius &&
      boundingBox.y - nodeRadius <= y && y <= y + canvas.height + nodeRadius
    )
    return result
  }

  function renderConnections() {
    let nodes = [renderableBinaryTree.root]
    let level = 0
    while (nodes.length >= 1) {
      for (let index = 0; index < nodes.length; index++) {
        const node = nodes[index]
        const children = node.children.flat()
        for (const child of children) {
          context.beginPath()
          context.moveTo(node.position.x, node.position.y + nodeRadius)
          context.lineTo(child.position.x, child.position.y - nodeRadius)
          context.stroke()
        }
      }
      nodes = nodes.map(node => node.children).flat()
    }
  }

  return { canvas, totalRenderingWidth, totalRenderingHeight }
}

function getNumberOfNodes(binaryTree) {
  const numberOfNodes = []
  let nodes = [binaryTree.root]
  while (nodes.length >= 1) {
    numberOfNodes.push(nodes.length)
    nodes = nodes.map(node => node.children).flat()
  }
  return numberOfNodes
}


export function createBinaryTreeGraph({ min, max, step, showLabels }) {
  if (typeof showLabels === 'undefined') {
    showLabels = true
  }

  // Zooming
  // Moving
  // Rendering of arbitrary big graphics
  //   Regarding limitation of maximum canvas size:
  //     Solution: Render part of the graphics
  //               which needs to be visible.
  //     and we render as big of a part of the graphics
  //     as possible so that we minimize the rerendering
  //     of the graphics after move actions.

  const binaryTree = createBinaryTree({ min, max, step, showLabels })

  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  let viewportBoundingBox = {
    x: 0, // The x-coordinate of the first left top pixel that should be rendered.
    y: 0, // The y-coordinate of the first left top pixel that should be rendered.
    width: viewportWidth, // The width of the viewport.
    height: viewportHeight // The height of the viewport.
  }
  let previousBoundingBox = viewportBoundingBox
  // x: The x-coordinate of the first left top pixel of the graphics that is rendered in the graphics canvas.
  // y: The y-coordinate of the first left top pixel of the graphics that is rendered in the graphics canvas.
  // width: The width of the viewport of the graphics canvas.
  // height: The height of the viewport of the graphics canvas.
  let binaryTreeRenderingBoundingBox
  let binaryTreeRendering
  let totalRenderingWidth
  let totalRenderingHeight
  let zoom = 1

  function onResize({ canvas, context }) {
    setViewportBoundingBox({
      x: viewportBoundingBox.x,
      y: viewportBoundingBox.y,
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  const { canvas, context } = createFullDocumentCanvas(onResize)

  let result = rerenderBinaryTree(
    binaryTree,
    { viewportBoundingBox }
  )
  binaryTreeRendering = result.binaryTreeRendering
  totalRenderingWidth = result.totalRenderingWidth
  totalRenderingHeight = result.totalRenderingHeight
  binaryTreeRenderingBoundingBox = result.binaryTreeRenderingBoundingBox

  function setViewportBoundingBox(newViewportBoundingBox) {
    previousBoundingBox = viewportBoundingBox
    viewportBoundingBox = newViewportBoundingBox
    if (
      (binaryTreeRenderingBoundingBox.x > 0 && viewportBoundingBox.x < binaryTreeRenderingBoundingBox.x) ||
      (binaryTreeRenderingBoundingBox.x + binaryTreeRenderingBoundingBox.width < totalRenderingWidth && viewportBoundingBox.x + window.devicePixelRatio * viewportBoundingBox.width / zoom > binaryTreeRenderingBoundingBox.x + binaryTreeRenderingBoundingBox.width) ||
      (binaryTreeRenderingBoundingBox.y > 0 && viewportBoundingBox.y < binaryTreeRenderingBoundingBox.y) ||
      (binaryTreeRenderingBoundingBox.y + binaryTreeRenderingBoundingBox.height < totalRenderingHeight && viewportBoundingBox.y + window.devicePixelRatio * viewportBoundingBox.height / zoom > binaryTreeRenderingBoundingBox.y + binaryTreeRenderingBoundingBox.height)
    ) {
      result = rerenderBinaryTree(
        binaryTree,
        { viewportBoundingBox }
      )
      binaryTreeRendering = result.binaryTreeRendering
      totalRenderingWidth = result.totalRenderingWidth
      binaryTreeRenderingBoundingBox = result.binaryTreeRenderingBoundingBox
    }
    render({ canvas, context }, { binaryTreeRendering, viewportBoundingBox, binaryTreeRenderingBoundingBox, zoom })
  }

  setViewportBoundingBox({
    x: -0.5 * (viewportBoundingBox.width - totalRenderingWidth / window.devicePixelRatio),
    y: canvas.height >= totalRenderingHeight ? -0.5 * (canvas.height - totalRenderingHeight) : 0,
    width: viewportBoundingBox.width,
    height: viewportBoundingBox.height
  })

  let spacePressed = false
  let primaryMouseButtonPressed = false
  let previousPosition = undefined

  window.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
      spacePressed = true
      document.body.classList.add('moving')
      event.preventDefault()
    }
  })

  window.addEventListener('keyup', (event) => {
    if (event.code === 'Space') {
      spacePressed = false
      previousPosition = undefined
      document.body.classList.remove('moving')
      event.preventDefault()
    }
  })

  window.addEventListener('mousedown', (event) => {
    if (event.button === 0) {
      primaryMouseButtonPressed = true
    }
  })

  window.addEventListener('mouseup', (event) => {
    if (event.button === 0) {
      primaryMouseButtonPressed = false
      previousPosition = undefined
    }
  })

  window.addEventListener('mousemove', (event) => {
    if (spacePressed && primaryMouseButtonPressed) {
      const position = {
        x: event.pageX,
        y: event.pageY
      }

      if (previousPosition) {
        const delta = {
          x: position.x - previousPosition.x,
          y: position.y - previousPosition.y
        }
        setViewportBoundingBox({
          x: viewportBoundingBox.x - delta.x * window.devicePixelRatio / zoom,
          y: viewportBoundingBox.y - delta.y * window.devicePixelRatio / zoom,
          width: viewportBoundingBox.width,
          height: viewportBoundingBox.height
        })
      }

      previousPosition = position
    }
  })

  function onZoom(_zoom) {
    console.log('zoom', _zoom)
    const previousZoom = zoom
    zoom = _zoom
    const centerA = viewportBoundingBox.x + 0.5 * viewportBoundingBox.width
    setViewportBoundingBox(calculateViewport(viewportBoundingBox, previousZoom, zoom))
    const centerB = viewportBoundingBox.x + 0.5 * viewportBoundingBox.width
    console.log('centers', centerA, centerB, centerA === centerB)
  }

  zoomable(onZoom)

  return canvas
}
