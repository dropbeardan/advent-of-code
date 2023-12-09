import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
	'tests/*/vitest.config.{e2e,unit}.ts',
	// you can even run the same tests,
	// but with different configs in the same "vitest" process
	{
		test: {
			name: 'happy-dom',
			root: './shared_tests',
			environment: 'happy-dom',
			setupFiles: ['./setup.happy-dom.ts'],
		},
	},
	{
		test: {
			name: 'node',
			root: './shared_tests',
			environment: 'node',
			setupFiles: ['./setup.node.ts'],
		},
	},
]);
