import { RenderableBinaryTreeNode } from './RenderableBinaryTreeNode.js';

export class RenderableBinaryTree extends BinaryTree {
  constructor() {
    super()
    this.root = new RenderableBinaryTreeNode()
  }
}
