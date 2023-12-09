import { readFile } from "fs/promises";

export const readFileAsArray = async (path: string) => {
  const file = await readFile(path);

  return file
    .toString()
    .split(/\r\n|\n/)
    .map((line) => (line || "").trim());
};
