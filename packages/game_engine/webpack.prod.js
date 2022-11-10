import prod from "@sanjo/webpack/webpack.prod.js";
import { merge } from "webpack-merge";

const config = merge(prod, {
  entry: "./src/demo.js",
});

export default config;
