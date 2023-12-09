import { describe, expect, it } from 'vitest';

import {
	getGameDetails,
	getMaxRevelationCountsByColor,
	getRequiredPowerFromRGB,
	getRevelationResults,
} from './helpers';

describe('getGameDetails', () => {
	it('returns the id, revelations and the maximum revealed counts by color of the game', () => {
		expect(
			getGameDetails('Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green')
		).toEqual({
			gameId: 1,
			maxRevelationsByColor: {
				blue: 6,
				green: 2,
				red: 4,
			},
			requiredPower: 48,
			revelations: [
				[
					{ color: 'blue', count: 3 },
					{ color: 'red', count: 4 },
				],
				[
					{ color: 'red', count: 1 },
					{ color: 'green', count: 2 },
					{ color: 'blue', count: 6 },
				],
				[{ color: 'green', count: 2 }],
			],
		});

		expect(
			getGameDetails(
				'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue'
			)
		).toEqual({
			gameId: 2,
			maxRevelationsByColor: {
				blue: 4,
				green: 3,
				red: 1,
			},
			requiredPower: 12,
			revelations: [
				[
					{ color: 'blue', count: 1 },
					{ color: 'green', count: 2 },
				],
				[
					{ color: 'green', count: 3 },
					{ color: 'blue', count: 4 },
					{ color: 'red', count: 1 },
				],
				[
					{ color: 'green', count: 1 },
					{ color: 'blue', count: 1 },
				],
			],
		});

		expect(
			getGameDetails(
				'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red'
			)
		).toEqual({
			gameId: 3,
			maxRevelationsByColor: {
				blue: 6,
				green: 13,
				red: 20,
			},
			requiredPower: 1560,
			revelations: [
				[
					{ color: 'green', count: 8 },
					{ color: 'blue', count: 6 },
					{ color: 'red', count: 20 },
				],
				[
					{ color: 'blue', count: 5 },
					{ color: 'red', count: 4 },
					{ color: 'green', count: 13 },
				],
				[
					{ color: 'green', count: 5 },
					{ color: 'red', count: 1 },
				],
			],
		});

		expect(
			getGameDetails(
				'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red'
			)
		).toEqual({
			gameId: 4,
			maxRevelationsByColor: {
				blue: 15,
				green: 3,
				red: 14,
			},
			requiredPower: 630,
			revelations: [
				[
					{ color: 'green', count: 1 },
					{ color: 'red', count: 3 },
					{ color: 'blue', count: 6 },
				],
				[
					{ color: 'green', count: 3 },
					{ color: 'red', count: 6 },
				],
				[
					{ color: 'green', count: 3 },
					{ color: 'blue', count: 15 },
					{ color: 'red', count: 14 },
				],
			],
		});

		expect(
			getGameDetails('Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green')
		).toEqual({
			gameId: 5,
			maxRevelationsByColor: {
				blue: 2,
				green: 3,
				red: 6,
			},
			requiredPower: 36,
			revelations: [
				[
					{ color: 'red', count: 6 },
					{ color: 'blue', count: 1 },
					{ color: 'green', count: 3 },
				],
				[
					{ color: 'blue', count: 2 },
					{ color: 'red', count: 1 },
					{ color: 'green', count: 2 },
				],
			],
		});
	});

	describe('when the line is not a valid game detail', () => {
		it('throws an error indicating that the line is invalid', () => {
			expect(() => getGameDetails('abc')).toThrow('Invalid line.');
		});
	});
});

describe('getRequiredPowerFromRGB', () => {
	it('returns the multiplication of the maximum blue, green and red revelation results', () => {
		expect(getRequiredPowerFromRGB({ blue: 2, green: 3, red: 4 })).toEqual(24);
	});

	describe('when additional colors are specified', () => {
		it('ignores the additional colors', () => {
			expect(
				getRequiredPowerFromRGB({
					black: 100,
					blue: 2,
					green: 3,
					red: 4,
					white: 200,
				})
			).toEqual(24);
		});
	});

	describe('when either the blue, green or red colors were not revealed', () => {
		it('returns the multiplication of the remaining revelation results', () => {
			expect(getRequiredPowerFromRGB({ blue: 0, green: 3, red: 4 })).toEqual(
				12
			);
			expect(getRequiredPowerFromRGB({ blue: 2, green: 0, red: 4 })).toEqual(8);
			expect(getRequiredPowerFromRGB({ blue: 2, green: 3, red: 0 })).toEqual(6);
			expect(getRequiredPowerFromRGB({ blue: 2, green: 0, red: 0 })).toEqual(2);
			expect(getRequiredPowerFromRGB({ blue: 0, green: 3, red: 0 })).toEqual(3);
			expect(getRequiredPowerFromRGB({ blue: 0, green: 0, red: 4 })).toEqual(4);
		});
	});

	describe('when no blue, green or red colors were revealed', () => {
		it('returns zero', () => {
			expect(getRequiredPowerFromRGB({ blue: 0, green: 0, red: 0 })).toEqual(0);
		});
	});
});

describe('getRevelationResults', () => {
	it('returns a list of colors and counts associated with the revelation', () => {
		expect(getRevelationResults('3 blue, 4 red')).toEqual([
			{ color: 'blue', count: 3 },
			{ color: 'red', count: 4 },
		]);

		expect(getRevelationResults('1 red, 2 green, 6 blue')).toEqual([
			{ color: 'red', count: 1 },
			{ color: 'green', count: 2 },
			{ color: 'blue', count: 6 },
		]);

		expect(getRevelationResults('2 green')).toEqual([
			{ color: 'green', count: 2 },
		]);
	});

	describe('when no revelations are specified', () => {
		it('throws an error indicating the invalid revelation', () => {
			expect(() => getRevelationResults('')).toThrow('Invalid revelation.');
		});
	});
});

describe('getMaxRevelationCountsByColor', () => {
	it('returns a record indicating the maximum revelation counts by its color', () => {
		expect(
			getMaxRevelationCountsByColor([
				{ color: 'blue', count: 3 },
				{ color: 'red', count: 4 },
				{ color: 'red', count: 1 },
				{ color: 'green', count: 2 },
				{ color: 'blue', count: 6 },
				{ color: 'green', count: 2 },
			])
		).toEqual({
			blue: 6,
			green: 2,
			red: 4,
		});
	});
});
