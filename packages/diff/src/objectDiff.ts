import { union } from "@sanjo/set";
import { arrayDiff } from "./arrayDiff.js";
import { isObject } from "./isObject.js";
import { KeyPath } from "./KeyPath.js";
import { ObjectOperation } from "./ObjectOperation.js";

export type ObjectDiff = ObjectOperation[];

export function objectDiff(
  fromObject: { [key: string]: any },
  toObject: { [key: string]: any },
  keyPath: KeyPath = []
): ObjectDiff {
  const fromKeys = new Set(Object.keys(fromObject));
  const toKeys = new Set(Object.keys(toObject));

  const keys = union(fromKeys, toKeys);
  const operations: ObjectDiff = [];
  const _isAddOperation = isAddOperation.bind(null, fromKeys, toKeys);
  const _isUpdateOperation = isUpdateOperation.bind(null, fromKeys, toKeys);
  const _isRemoveOperation = isRemoveOperation.bind(null, fromKeys, toKeys);
  const operationTypes = new Map([
    [_isAddOperation, { type: "add", create: createOperationAdd }],
    [_isUpdateOperation, { type: "update", create: createOperationUpdate }],
    [_isRemoveOperation, { type: "remove", create: createOperationRemove }],
  ]);
  for (const key of keys) {
    const fromValue = fromObject[key];
    const toValue = toObject[key]; // clone reference values ggf.

    for (const [isKindOfOperation, { type, create }] of operationTypes) {
      if (isKindOfOperation(key)) {
        if (type === "update") {
          if (fromValue !== toValue) {
            if (isObject(fromValue) && isObject(toValue)) {
              if (objectDiff(fromValue, toValue).length >= 1) {
                operations.push(
                  ...objectDiff(fromValue, toValue, [...keyPath, key])
                );
              }
            } else if (Array.isArray(fromValue) && Array.isArray(toValue)) {
              if (arrayDiff(fromValue, toValue).length >= 1) {
                operations.push(
                  ...arrayDiff(fromValue, toValue).map((operation) => ({
                    ...operation,
                    key: [...keyPath, key],
                  }))
                );
              }
            } else {
              operations.push(
                create({
                  key: [...keyPath, key],
                  value: toValue,
                })
              );
            }
          }
        } else {
          operations.push(
            create({
              key: [...keyPath, key],
              value: toValue,
            })
          );
        }
        break;
      }
    }
  }

  return operations;
}

function isAddOperation(
  fromKeys: Set<string>,
  toKeys: Set<string>,
  key: string
): boolean {
  return !fromKeys.has(key) && toKeys.has(key);
}

function isUpdateOperation(
  fromKeys: Set<string>,
  toKeys: Set<string>,
  key: string
): boolean {
  return fromKeys.has(key) && toKeys.has(key);
}

function isRemoveOperation(
  fromKeys: Set<string>,
  toKeys: Set<string>,
  key: string
): boolean {
  return fromKeys.has(key) && !toKeys.has(key);
}

function createOperationAdd({
  key,
  value,
}: {
  key: KeyPath;
  value: any;
}): ObjectOperation {
  return { type: "add", key: key, value };
}

function createOperationUpdate({
  key,
  value,
}: {
  key: KeyPath;
  value: any;
}): ObjectOperation {
  return { type: "update", key: key, value };
}

function createOperationRemove({ key }: { key: KeyPath }): ObjectOperation {
  return { type: "remove", key: key };
}
