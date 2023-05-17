/* eslint-disable camelcase */
const common = [
	'--require-module ts-node/register' // Load TypeScript module
];

const features = [
	...common,
	'tests/app/features/**/*.feature',
	'--require tests/app/features/step_definitions/*.steps.ts'
].join(' ');

module.exports = {
	features
};
