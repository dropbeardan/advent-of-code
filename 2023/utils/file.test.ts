import { describe, expect, it } from "vitest";

import path from "path";
import { readFileAsArray } from "./file";

describe("readFileAsArray", () => {
  describe("when the file is valid", () => {
    const filePath = path.resolve(__dirname, "./mocks/multiline-file.txt");

    it("returns the file contents as an array of strings, delimited by newline", async () => {
      const response = await readFileAsArray(filePath);

      expect(response).toEqual([
        "This is the first line.",
        "This is the 2nd line.",
        "This is the 3rd line with a long leading whitespaces.",
        "This is the 4th line with a long trailing whitespaces.",
        "",
        "This is the 6th line.",
      ]);
    });
  });

  describe("when the file does not exist", () => {
    const filePath = path.resolve(__dirname, "./mocks/invalid-file.txt");

    it("throws an error", () => {
      expect(() => readFileAsArray(filePath)).rejects.toThrow();
    });
  });
});
