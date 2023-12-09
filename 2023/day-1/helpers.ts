import { first, isEmpty, last, sortBy } from 'lodash';

const NUMBER_MAPPINGS = {
	'0': 0,
	'1': 1,
	'2': 2,
	'3': 3,
	'4': 4,
	'5': 5,
	'6': 6,
	'7': 7,
	'8': 8,
	'9': 9,
};

export const getCalibrationValue = (line: string) => {
	const numberInstances = getInstancesOfNumbers(line);

	if (isEmpty(numberInstances)) {
		throw new Error('No number detected in line.');
	}

	const numberInstancesByFirstOccurrence = sortBy(
		numberInstances,
		'firstIndex'
	);
	const numberInstancesByLastOccurrence = sortBy(numberInstances, 'lastIndex');

	const firstNumber = first(
		numberInstancesByFirstOccurrence
	)!.numberRepresentation;

	const lastNumber = last(
		numberInstancesByLastOccurrence
	)!.numberRepresentation;

	return Number(String(firstNumber) + String(lastNumber));
};

export const getInstancesOfNumbers = (line: string) =>
	Object.entries(NUMBER_MAPPINGS)
		.map(([stringRepresentation, numberRepresentation]) => {
			const firstIndex = line.indexOf(stringRepresentation);
			const lastIndex = line.lastIndexOf(stringRepresentation);

			return {
				firstIndex,
				lastIndex,
				numberRepresentation,
				stringRepresentation,
			};
		})
		.filter((instance) => instance.firstIndex > -1);
