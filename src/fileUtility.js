import { readFile, writeFile } from "node:fs/promises";

export function writeToJSONFile(path, data) {
  return writeFile(path, JSON.stringify(data));
}

export function readFromJSONFile(path) {
  return readFile(path).then(f => JSON.parse(f));
}