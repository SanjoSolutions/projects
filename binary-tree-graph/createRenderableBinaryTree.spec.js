import { equals } from '../equals.js'
import { BinaryTree } from './BinaryTree.js'
import { BinaryTreeNode } from './BinaryTreeNode.js'
import { createRenderableBinaryTree } from './createRenderableBinaryTree.js'
import { RenderableBinaryTree } from './RenderableBinaryTree.js'
import { RenderableBinaryTreeNode } from './RenderableBinaryTreeNode.js'

describe('createRenderableBinaryTree', () => {
  test('creation', () => {
    const binaryTree = new BinaryTree()

    const child1 = new BinaryTreeNode()
    child1.parent = binaryTree.root
    child1.value = 1
    binaryTree.root.children[0] = child1

    const child2 = new BinaryTreeNode()
    child2.parent = binaryTree.root
    child2.value = 2
    binaryTree.root.children[1] = child2

    const renderableBinaryTree = createRenderableBinaryTree(binaryTree)

    const expectedRenderableBinaryTree = new RenderableBinaryTree()

    const renderableChild1 = new RenderableBinaryTreeNode()
    renderableChild1.parent = expectedRenderableBinaryTree.root
    renderableChild1.value = 1
    expectedRenderableBinaryTree.root.children[0] = renderableChild1

    const renderableChild2 = new RenderableBinaryTreeNode()
    renderableChild2.parent = expectedRenderableBinaryTree.root
    renderableChild2.value = 2
    expectedRenderableBinaryTree.root.children[1] = renderableChild2

    expect(renderableTreeEquals(renderableBinaryTree, expectedRenderableBinaryTree)).toEqual(true)
  })
})

function renderableTreeEquals(a, b) {
  let nodesA = [a.root]
  let nodesB = [b.root]

  do {
    if (nodesA.length !== nodesB.length) {
      return false
    }

    const length = nodesA.length
    for (let index = 0; index < length; index++) {
      if (!renderableTreeNodesEqual(nodesA[index], nodesB[index])) {
        return false
      }
    }

    nodesA = nodesA.map(node => node.children).flat()
    nodesB = nodesB.map(node => node.children).flat()
  } while (nodesA.length >= 1 || nodesB.length >= 1)

  return true
}

function renderableTreeNodesEqual(a, b) {
  return equals(a.value, b.value) && a.children.length === b.children.length
}
