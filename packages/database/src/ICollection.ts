export interface ICollection {
  insert(dataEntry: any): Promise<void>

  update(selector: any, update: any): Promise<void>

  find(): Promise<any[]>
}
