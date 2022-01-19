import { describe, it, expect } from '@jest/globals'

class BinaryTree {
  public root: BinaryTreeNode = new BinaryTreeNode()
}

class BinaryTreeNode {
  public children: BinaryTreeNode[] = []
}

function createBinaryTree() {
  const binaryTree = new BinaryTree()
  const root = binaryTree.root
  const numberOfChildren = 2
  root.children = createChildren(numberOfChildren)
  return binaryTree
}

function createChildren(numberOfChildren: number) {
  return new Array(numberOfChildren).fill(undefined).map(createBinaryTreeNode)
}

function createBinaryTreeNode() {
  return new BinaryTreeNode()
}

describe('Binary tree', () => {
  it('can represent a binary tree structure', () => {
    const binaryTree = createBinaryTree()
    expect(binaryTree.root instanceof BinaryTreeNode).toEqual(true)
    expect(binaryTree.root.children).toHaveLength(2)
    expect(binaryTree.root.children[0] instanceof BinaryTreeNode).toEqual(true)
    expect(binaryTree.root.children[1] instanceof BinaryTreeNode).toEqual(true)
  })
})
