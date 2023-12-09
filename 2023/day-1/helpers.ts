export const getCalibrationValue = (line: string) => {
	const firstNumberMatcher = /^[^\d]*(?<firstNumber>\d).*$/;
	const firstNumberMatches = line.match(firstNumberMatcher);

	if (!firstNumberMatches) {
		throw new Error('No number detected in line.');
	}

	const lastNumberMatcher = /^.*(?<lastNumber>\d)[^\d]*$/;
	const lastNumberMatches = line.match(lastNumberMatcher);

	const firstNumber = firstNumberMatches.groups!.firstNumber;
	const lastNumber = lastNumberMatches
		? lastNumberMatches.groups!.lastNumber
		: firstNumber;

	return Number(firstNumber + lastNumber);
};
