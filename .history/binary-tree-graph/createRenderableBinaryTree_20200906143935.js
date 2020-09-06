import { RenderableBinaryTree } from './RenderableBinaryTree.js';

export function createRenderableBinaryTree(binaryTree) {
  const renderableBinaryTree = new RenderableBinaryTree()

  renderableBinaryTree.root = createRenderableBinaryTreeNode(binaryTree.root)

  let nodes = [binaryTree.root]
  do {
    nodes.forEach(convertChildrenToRenderableBinaryTreeNodes)
    nodes = nodes.map(node => node.children).flat()
  } while (nodes.length >= 1)

  return renderableBinaryTree
}

function convertChildrenToRenderableBinaryTreeNodes(node) {
  node.children = node.children.map(convertBinaryTreeNodeToRenderableBinaryTreeNode.bind(undefined, parent))
}

function convertBinaryTreeNodeToRenderableBinaryTreeNode(parent, node) {
  const renderableChildNode = new RenderableBinaryTreeNode()
  renderableChildNode.value = node.value
  renderableChildNode.parent = parent
  renderableChildNode.children = node.children
  return renderableChildNode
}
