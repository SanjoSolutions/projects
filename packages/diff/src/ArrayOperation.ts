export interface ArrayOperation {
  type: "add" | "update" | "remove";
  index: number;
  value?: any;
  values?: any[];
  deleteCount?: number;
}
