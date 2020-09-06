import { RenderableBinaryTreeNode } from './RenderableBinaryTreeNode';

export class RenderableBinaryTree extends BinaryTree {
  constructor() {
    super()
    this.root = new RenderableBinaryTreeNode()
  }
}
