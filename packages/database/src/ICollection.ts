export interface ICollection {
  insert(dataEntry: any): Promise<void>;

  find(): Promise<any[]>;
}
