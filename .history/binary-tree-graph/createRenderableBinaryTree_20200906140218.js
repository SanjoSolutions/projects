import { createRenderableBinaryTreeNode } from './createRenderableBinaryTreeNode';

export function createRenderableBinaryTree(binaryTree) {
  const renderableBinaryTree = new RenderableBinaryTree()
  renderableBinaryTree.root = createRenderableBinaryTreeNode(binaryTree.root)
}
