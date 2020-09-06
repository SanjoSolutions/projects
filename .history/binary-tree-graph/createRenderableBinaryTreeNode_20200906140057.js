import { RenderableBinaryTreeNode } from './RenderableBinaryTreeNode.js';

export function createRenderableBinaryTreeNode(binaryTreeNode) {
  const renderableBinaryTreeNode = new RenderableBinaryTreeNode()

  renderableBinaryTreeNode.value = binaryTreeNode.value

  return renderableBinaryTreeNode
}
