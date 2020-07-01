import readFile from '@sanjo/read-file'
import type { Difference as DirCompareDifference } from 'dir-compare'
import { compare as compareDir } from 'dir-compare'
import path from 'path'

// can also use traverseDirectory and then diffArray

export async function diffFolders (
  folderAPath: string,
  folderBPath: string,
): Promise<Difference[]> {
  const differences = await compareDir(folderAPath, folderBPath, {
    compareContent: true,
    noDiffSet: false,
  })
  return await Promise.all(differences.diffSet!
    .filter(isDifferent)
    .map(transformDifference.bind(null, folderAPath, folderBPath)),
  )
}

function isDifferent (difference: DirCompareDifference) {
  return ['left', 'right', 'distinct'].includes(difference.state)
}

export interface Difference {
  type: 'added' | 'removed' | 'distinct'
  filePath: string
  contentA?: string
  contentB?: string
}

async function transformDifference (
  folderAPath: string,
  folderBPath: string,
  difference: DirCompareDifference,
): Promise<Difference> {
  if (isAdded(difference)) {
    return {
      type: 'added',
      filePath: path.relative(
        folderBPath,
        path.join(difference.path2 as string, difference.name2 as string),
      ),
    }
  } else if (isRemove(difference)) {
    return {
      type: 'removed',
      filePath: path.relative(
        folderAPath,
        path.join(difference.path1 as string, difference.name1 as string),
      ),
    }
  } else if (isDistinct(difference)) {
    const fileAPath = path.join(difference.path1 as string, difference.name1 as string)
    const fileBPath = path.join(difference.path2 as string, difference.name2 as string)
    return {
      type: 'distinct',
      filePath: path.relative(folderAPath, fileAPath),
      contentA: await readFile(fileAPath),
      contentB: await readFile(fileBPath),
    }
  } else {
    throw new Error('Unexpected difference: ' + JSON.stringify(difference, null, 2))
  }
}

function isAdded (difference: DirCompareDifference): boolean {
  return difference.state === 'right'
}

function isRemove (difference: DirCompareDifference): boolean {
  return difference.state === 'left'
}

function isDistinct (difference: DirCompareDifference): boolean {
  return difference.state === 'distinct'
}
