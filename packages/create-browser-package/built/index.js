#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_package_1 = require("@sanjo/create-package");
const path_1 = __importDefault(require("path"));
const templatePath = path_1.default.resolve(__dirname, '../template/');
create_package_1.createPackage({ templatePath }).catch(console.error);
//# sourceMappingURL=index.js.map