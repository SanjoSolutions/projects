import dev from "@sanjo/webpack/webpack.dev.js";
import { merge } from "webpack-merge";

const config = merge(dev, {
  entry: "./src/demo.js",
});

export default config;
