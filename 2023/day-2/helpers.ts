import { flatten, groupBy, last, sortBy } from "lodash";

export const getGameDetails = (line: string) => {
  const revelationMatches = line.match(
    /^Game (?<gameId>\d+):(?<gameRevelations>.+)$/i,
  );

  if (!revelationMatches) {
    throw new Error("Invalid line.");
  }

  const gameId = Number(revelationMatches.groups!.gameId);
  const revelations = revelationMatches.groups!.gameRevelations.split(";");

  const revelationResults = revelations.map((revelation) =>
    getRevelationResults(revelation),
  );

  const maxRevelationsByColor = getMaxRevelationCountsByColor(
    flatten(revelationResults),
  );

  const requiredPower = getRequiredPowerFromRGB(maxRevelationsByColor);

  return {
    gameId,
    maxRevelationsByColor,
    requiredPower,
    revelations: revelationResults,
  };
};

export const getMaxRevelationCountsByColor = (
  results: Array<{ color: string; count: number }>,
) => {
  const groupedResults = groupBy(results, "color");

  return Object.entries(groupedResults).reduce(
    (currGroups, [nextColor, nextResult]) => ({
      ...currGroups,
      [nextColor]: last(sortBy(nextResult, "count"))!.count,
    }),
    {} as Record<string, number>,
  );
};

export const getRevelationResults = (revelation: string) =>
  revelation.split(",").map((revelation) => {
    const colorMatches = revelation
      .trim()
      .match(/^(?<count>\d+) (?<color>\S+)$/);

    if (!colorMatches) {
      throw new Error("Invalid revelation.");
    }

    return {
      color: colorMatches.groups!.color.toLowerCase(),
      count: Number(colorMatches.groups!.count),
    };
  });

export const getRequiredPowerFromRGB = (
  maxRevelationCounts: Record<string, number>,
) => {
  if (
    !maxRevelationCounts.blue &&
    !maxRevelationCounts.green &&
    !maxRevelationCounts.red
  ) {
    return 0;
  }

  const requiredBluePower = maxRevelationCounts.blue || 1;
  const requiredGreenPower = maxRevelationCounts.green || 1;
  const requiredRedPower = maxRevelationCounts.red || 1;

  return requiredBluePower * requiredGreenPower * requiredRedPower;
};
