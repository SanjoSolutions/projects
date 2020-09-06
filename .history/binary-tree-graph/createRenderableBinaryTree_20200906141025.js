import { createRenderableBinaryTreeNode } from './createRenderableBinaryTreeNode.js';

export function createRenderableBinaryTree(binaryTree) {
  const renderableBinaryTree = new RenderableBinaryTree()

  let nodes = [binaryTree.root]

  renderableBinaryTree.root = createRenderableBinaryTreeNode(binaryTree.root)
  const fromNode = binaryTree.root
  const toNode = renderableBinaryTree.root
  copyChildrenAsRenderableBinaryTreeNodes(fromNode, toNode)
}

function convertChildrenToRenderableBinaryTreeNodes(node) {
  node.children = node.children.map((child) => {
    const renderableChildNode = new RenderableBinaryTreeNode()
    renderableChildNode.value = child.value
    renderableChildNode.parent = node
    renderableChildNode.children = child.children
  })
}
