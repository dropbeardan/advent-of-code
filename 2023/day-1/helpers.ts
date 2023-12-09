import { first, isEmpty, last, sortBy } from "lodash";

const NUMBER_MAPPINGS = {
  "0": 0,
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
};

const WORD_TO_NUMBER_MAPPINGS = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

export const getCalibrationValue = (line: string) => {
  const numberInstances = getInstancesOfNumbers(line);

  if (isEmpty(numberInstances)) {
    throw new Error("No number detected in line.");
  }

  const numberInstancesByFirstOccurrence = sortBy(
    numberInstances,
    "firstIndex",
  );
  const numberInstancesByLastOccurrence = sortBy(numberInstances, "lastIndex");

  const firstNumber = first(
    numberInstancesByFirstOccurrence,
  )!.numberRepresentation;

  const lastNumber = last(
    numberInstancesByLastOccurrence,
  )!.numberRepresentation;

  return Number(String(firstNumber) + String(lastNumber));
};

export const getInstancesOfNumbers = (line: string) =>
  [
    ...Object.entries(NUMBER_MAPPINGS),
    ...Object.entries(WORD_TO_NUMBER_MAPPINGS),
  ]
    .map(([stringRepresentation, numberRepresentation]) => {
      const firstIndex = line
        .toLowerCase()
        .indexOf(stringRepresentation.toLowerCase());
      const lastIndex = line
        .toLowerCase()
        .lastIndexOf(stringRepresentation.toLowerCase());

      return {
        firstIndex,
        lastIndex,
        numberRepresentation,
        stringRepresentation,
      };
    })
    .filter((instance) => instance.firstIndex > -1);
