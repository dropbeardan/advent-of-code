import { describe, expect, it } from 'vitest';

import { getCalibrationValue } from './helpers';

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
