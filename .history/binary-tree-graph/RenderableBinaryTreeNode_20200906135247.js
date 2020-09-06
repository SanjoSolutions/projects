import { BinaryTreeNode } from './BinaryTreeNode';

export class RenderableBinaryTreeNode extends BinaryTreeNode {
  constructor() {
    super()
    this.position = { x: undefined, y: undefined }
  }
}
