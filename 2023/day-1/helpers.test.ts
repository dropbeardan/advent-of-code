import { describe, expect, it } from "vitest";

import { getCalibrationValue, getInstancesOfNumbers } from "./helpers";

describe("getCalibrationValue", () => {
  it("returns the number representation of the first and last numbers in the line joined together", () => {
    expect(getCalibrationValue("1abc2")).toEqual(12);
    expect(getCalibrationValue("pqr3stu8vwx")).toEqual(38);
    expect(getCalibrationValue("a1b2c3d4e5f")).toEqual(15);
  });

  describe("when only a single number is present in the line", () => {
    it("returns the number representation of the first number joined together with itself", () => {
      expect(getCalibrationValue("treb7uchet")).toEqual(77);
    });
  });

  describe("when the numbers (1-9) are represented as words", () => {
    it("returns the number representation of the first and last numbers in the line joined together", () => {
      expect(getCalibrationValue("two1nine")).toEqual(29);
      expect(getCalibrationValue("eightwothree")).toEqual(83);
      expect(getCalibrationValue("abcone2threexyz")).toEqual(13);
      expect(getCalibrationValue("xtwone3four")).toEqual(24);
      expect(getCalibrationValue("4nineeightseven2")).toEqual(42);
      expect(getCalibrationValue("zoneight234")).toEqual(14);
      expect(getCalibrationValue("7pqrstsixteen")).toEqual(76);
    });
  });

  describe("when no numbers are present in the line", () => {
    it("throws an error indicating no numbers detected in the line", () => {
      expect(() => getCalibrationValue("abc")).toThrow(
        "No number detected in line.",
      );
    });
  });
});

describe("getInstancesOfNumbers", () => {
  it("returns the first index, last index, number representation and string representation of the number value in the string", () => {
    expect(getInstancesOfNumbers("0123456789")).toContainEqual({
      firstIndex: 0,
      lastIndex: 0,
      numberRepresentation: 0,
      stringRepresentation: "0",
    });

    expect(getInstancesOfNumbers("0123456789")).toContainEqual({
      firstIndex: 1,
      lastIndex: 1,
      numberRepresentation: 1,
      stringRepresentation: "1",
    });

    expect(getInstancesOfNumbers("0123456789")).toContainEqual({
      firstIndex: 2,
      lastIndex: 2,
      numberRepresentation: 2,
      stringRepresentation: "2",
    });

    expect(getInstancesOfNumbers("0123456789")).toContainEqual({
      firstIndex: 3,
      lastIndex: 3,
      numberRepresentation: 3,
      stringRepresentation: "3",
    });

    expect(getInstancesOfNumbers("0123456789")).toContainEqual({
      firstIndex: 4,
      lastIndex: 4,
      numberRepresentation: 4,
      stringRepresentation: "4",
    });

    expect(getInstancesOfNumbers("0123456789")).toContainEqual({
      firstIndex: 5,
      lastIndex: 5,
      numberRepresentation: 5,
      stringRepresentation: "5",
    });

    expect(getInstancesOfNumbers("0123456789")).toContainEqual({
      firstIndex: 6,
      lastIndex: 6,
      numberRepresentation: 6,
      stringRepresentation: "6",
    });

    expect(getInstancesOfNumbers("0123456789")).toContainEqual({
      firstIndex: 7,
      lastIndex: 7,
      numberRepresentation: 7,
      stringRepresentation: "7",
    });

    expect(getInstancesOfNumbers("0123456789")).toContainEqual({
      firstIndex: 8,
      lastIndex: 8,
      numberRepresentation: 8,
      stringRepresentation: "8",
    });

    expect(getInstancesOfNumbers("0123456789")).toContainEqual({
      firstIndex: 9,
      lastIndex: 9,
      numberRepresentation: 9,
      stringRepresentation: "9",
    });
  });

  describe("when the numbers (1-9) are expressed as words", () => {
    it("returns the instance details corresponding to the number representation of those words", () => {
      expect(
        getInstancesOfNumbers("oneTwoTHREEfourFiveSIXsevenEightNINE"),
      ).toContainEqual({
        firstIndex: 0,
        lastIndex: 0,
        numberRepresentation: 1,
        stringRepresentation: "one",
      });

      expect(
        getInstancesOfNumbers("oneTwoTHREEfourFiveSIXsevenEightNINE"),
      ).toContainEqual({
        firstIndex: 3,
        lastIndex: 3,
        numberRepresentation: 2,
        stringRepresentation: "two",
      });

      expect(
        getInstancesOfNumbers("oneTwoTHREEfourFiveSIXsevenEightNINE"),
      ).toContainEqual({
        firstIndex: 6,
        lastIndex: 6,
        numberRepresentation: 3,
        stringRepresentation: "three",
      });

      expect(
        getInstancesOfNumbers("oneTwoTHREEfourFiveSIXsevenEightNINE"),
      ).toContainEqual({
        firstIndex: 11,
        lastIndex: 11,
        numberRepresentation: 4,
        stringRepresentation: "four",
      });

      expect(
        getInstancesOfNumbers("oneTwoTHREEfourFiveSIXsevenEightNINE"),
      ).toContainEqual({
        firstIndex: 15,
        lastIndex: 15,
        numberRepresentation: 5,
        stringRepresentation: "five",
      });

      expect(
        getInstancesOfNumbers("oneTwoTHREEfourFiveSIXsevenEightNINE"),
      ).toContainEqual({
        firstIndex: 19,
        lastIndex: 19,
        numberRepresentation: 6,
        stringRepresentation: "six",
      });

      expect(
        getInstancesOfNumbers("oneTwoTHREEfourFiveSIXsevenEightNINE"),
      ).toContainEqual({
        firstIndex: 22,
        lastIndex: 22,
        numberRepresentation: 7,
        stringRepresentation: "seven",
      });

      expect(
        getInstancesOfNumbers("oneTwoTHREEfourFiveSIXsevenEightNINE"),
      ).toContainEqual({
        firstIndex: 27,
        lastIndex: 27,
        numberRepresentation: 8,
        stringRepresentation: "eight",
      });

      expect(
        getInstancesOfNumbers("oneTwoTHREEfourFiveSIXsevenEightNINE"),
      ).toContainEqual({
        firstIndex: 32,
        lastIndex: 32,
        numberRepresentation: 9,
        stringRepresentation: "nine",
      });
    });
  });

  describe("when there are multiple instances of the same number", () => {
    it("sets the firstIndex and lastIndex to the indexes of the first and last instances of the number", () => {
      expect(getInstancesOfNumbers("0x0x0")).toContainEqual({
        firstIndex: 0,
        lastIndex: 4,
        numberRepresentation: 0,
        stringRepresentation: "0",
      });

      expect(getInstancesOfNumbers("onexOnexONE")).toContainEqual({
        firstIndex: 0,
        lastIndex: 8,
        numberRepresentation: 1,
        stringRepresentation: "one",
      });
    });
  });

  describe("when there are no instances of any numbers", () => {
    it("returns an empty array", () => {
      expect(getInstancesOfNumbers("abc")).toEqual([]);
    });
  });
});
