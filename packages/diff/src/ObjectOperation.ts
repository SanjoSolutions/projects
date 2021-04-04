import { KeyPath } from "./KeyPath";

export interface ObjectOperation {
  type: "add" | "update" | "remove";
  key: KeyPath;
  value?: any;
}
