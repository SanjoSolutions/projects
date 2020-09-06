import { BinaryTreeNode } from './BinaryTreeNode.js';

export class RenderableBinaryTreeNode extends BinaryTreeNode {
  constructor() {
    super()
    this.position = { x: undefined, y: undefined }
  }
}
