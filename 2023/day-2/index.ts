import { sum } from 'lodash';
import path from 'path';

import { readFileAsArray } from '../utils/file';

import { getGameDetails } from './helpers';

const INPUT_FILE = path.resolve(__dirname, './assets/input.txt');

const main = async () => {
	const lines = await readFileAsArray(INPUT_FILE);

	const gameDetails = lines.map((line) => getGameDetails(line));

	const qualifyingGameDetails = gameDetails.filter(
		(game) =>
			game.maxRevelationsByColor.red <= 12 &&
			game.maxRevelationsByColor.green <= 13 &&
			game.maxRevelationsByColor.blue <= 14
	);

	const sumOfQualifyingGameIds = sum(
		qualifyingGameDetails.map((game) => game.gameId)
	);

	console.log({ sumOfQualifyingGameIds });

	const totalRequiredGamePowers = sum(
		gameDetails.map((game) => game.requiredPower)
	);

	console.log({ totalRequiredGamePowers });
};

main();
