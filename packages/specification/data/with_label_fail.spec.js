import { specification } from "../index.js";

specification("test", function () {
  throw new Error("fail");
});
