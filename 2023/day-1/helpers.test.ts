import { describe, expect, it } from 'vitest';

import { getCalibrationValue, getInstancesOfNumbers } from './helpers';

describe('getCalibrationValue', () => {
	it('returns the number represenatation of the first and last numbers in the line joined together', () => {
		expect(getCalibrationValue('1abc2')).toEqual(12);
		expect(getCalibrationValue('pqr3stu8vwx')).toEqual(38);
		expect(getCalibrationValue('a1b2c3d4e5f')).toEqual(15);
	});

	describe('when only a single number is present in the line', () => {
		it('returns the number representation of the first number joined together with itself', () => {
			expect(getCalibrationValue('treb7uchet')).toEqual(77);
		});
	});

	describe('when no numbers are present in the line', () => {
		it('throws an error indicating no numbers detected in the line', () => {
			expect(() => getCalibrationValue('abc')).toThrow(
				'No number detected in line.'
			);
		});
	});
});

describe('getInstancesOfNumbers', () => {
	it('returns the first index, last index, number representation and string representation of the number value in the string', () => {
		expect(getInstancesOfNumbers('0123456789')).toContainEqual({
			firstIndex: 0,
			lastIndex: 0,
			numberRepresentation: 0,
			stringRepresentation: '0',
		});

		expect(getInstancesOfNumbers('0123456789')).toContainEqual({
			firstIndex: 1,
			lastIndex: 1,
			numberRepresentation: 1,
			stringRepresentation: '1',
		});

		expect(getInstancesOfNumbers('0123456789')).toContainEqual({
			firstIndex: 2,
			lastIndex: 2,
			numberRepresentation: 2,
			stringRepresentation: '2',
		});

		expect(getInstancesOfNumbers('0123456789')).toContainEqual({
			firstIndex: 3,
			lastIndex: 3,
			numberRepresentation: 3,
			stringRepresentation: '3',
		});

		expect(getInstancesOfNumbers('0123456789')).toContainEqual({
			firstIndex: 4,
			lastIndex: 4,
			numberRepresentation: 4,
			stringRepresentation: '4',
		});

		expect(getInstancesOfNumbers('0123456789')).toContainEqual({
			firstIndex: 5,
			lastIndex: 5,
			numberRepresentation: 5,
			stringRepresentation: '5',
		});

		expect(getInstancesOfNumbers('0123456789')).toContainEqual({
			firstIndex: 6,
			lastIndex: 6,
			numberRepresentation: 6,
			stringRepresentation: '6',
		});

		expect(getInstancesOfNumbers('0123456789')).toContainEqual({
			firstIndex: 7,
			lastIndex: 7,
			numberRepresentation: 7,
			stringRepresentation: '7',
		});

		expect(getInstancesOfNumbers('0123456789')).toContainEqual({
			firstIndex: 8,
			lastIndex: 8,
			numberRepresentation: 8,
			stringRepresentation: '8',
		});

		expect(getInstancesOfNumbers('0123456789')).toContainEqual({
			firstIndex: 9,
			lastIndex: 9,
			numberRepresentation: 9,
			stringRepresentation: '9',
		});
	});

	describe('when there are multiple instances of the same number', () => {
		it('sets the firstIndex and lastIndex to the indexes of the first and last instances of the number', () => {
			expect(getInstancesOfNumbers('0x0x0')).toContainEqual({
				firstIndex: 0,
				lastIndex: 4,
				numberRepresentation: 0,
				stringRepresentation: '0',
			});
		});
	});

	describe('when there are no instances of any numbers', () => {
		it('returns an empty array', () => {
			expect(getInstancesOfNumbers('abc')).toEqual([]);
		});
	});
});
