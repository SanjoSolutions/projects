import { createRenderableBinaryTreeNode } from './createRenderableBinaryTreeNode.js';

export function createRenderableBinaryTree(binaryTree) {
  const renderableBinaryTree = new RenderableBinaryTree()

  renderableBinaryTree.root = createRenderableBinaryTreeNode(binaryTree.root)

  let nodes = [binaryTree.root]
  do {
    nodes.forEach(convertChildrenToRenderableBinaryTreeNodes)
    nodes = nodes.map(node => node.children).flat()
  } while (nodes.length >= 1)
}

function convertChildrenToRenderableBinaryTreeNodes(node) {
  node.children = node.children.map((child) => {
    const renderableChildNode = new RenderableBinaryTreeNode()
    renderableChildNode.value = child.value
    renderableChildNode.parent = node
    renderableChildNode.children = child.children
  })
}
