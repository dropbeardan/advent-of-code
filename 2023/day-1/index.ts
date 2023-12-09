import { sum } from "lodash";
import path from "path";

import { readFileAsArray } from "../utils/file";

import { getCalibrationValue } from "./helpers";

const INPUT_FILE = path.resolve(__dirname, "./assets/input.txt");

const main = async () => {
  const lines = await readFileAsArray(INPUT_FILE);

  const calibrationValues = lines.map((line) => getCalibrationValue(line));

  const calibrationSum = sum(calibrationValues);

  console.log({ calibrationSum });
};

main();
