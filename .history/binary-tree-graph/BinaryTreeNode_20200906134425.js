
export class BinaryTreeNode {
  constructor() {
    this.value = undefined
    this.parent = undefined
    this.children = new Array(2)
    // For rendering
    this.position = { x: undefined, y: undefined }
  }
}
