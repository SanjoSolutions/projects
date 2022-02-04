import { extractPackageFolderName } from './extractPackageFolderName.js'

export function fix(data: any, path: string): any {
  data = {
    keywords: [],
    license: 'Unlicense',
    ...data,
    homepage: `https://github.com/SanjoSolutions/unnamed/tree/main/packages/${extractPackageFolderName(path)}`,
    repository: {
      type: 'git',
      url: 'https://github.com/SanjoSolutions/unnamed.git',
      directory: `packages/${extractPackageFolderName(path)}`,
    },
  }

  data = Object.entries(data)
  data.sort(compare)
  data = Object.fromEntries(data)

  return data
}

function compare(a: [string, any], b: [string, any]): number {
  const aValue = determineSortValue(a[0])
  const bValue = determineSortValue(b[0])
  return aValue - bValue
}

const sortOrder = [
  'name',
  'version',
  'type',
  'description',
  'keywords',
  'homepage',
  'license',
  'main',
  'repository',
  'scripts',
  'types',
  'dependencies',
  'devDependencies',
  'types',
  'publishConfig',
]

function determineSortValue(key: string): number {
  return sortOrder.indexOf(key) ?? Number.MAX_SAFE_INTEGER
}
