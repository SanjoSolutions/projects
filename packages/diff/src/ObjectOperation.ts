import { KeyPath } from "./KeyPath.js";

export interface ObjectOperation {
  type: "add" | "update" | "remove";
  key: KeyPath;
  value?: any;
}
