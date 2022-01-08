export type ArrayOperation = ArrayAddOperation | ArrayUpdateOperation | ArrayRemoveOperation

export interface ArrayAddOperation {
  type: 'add'
  index: number
  values: any[]
}

export interface ArrayUpdateOperation {
  type: 'update'
  index: number
  value?: any
}

export interface ArrayRemoveOperation {
  type: 'remove'
  index: number
  deleteCount: number
}
