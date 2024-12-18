import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs', // CommonJS modules
      globals: {
        ...globals.browser, // Include browser globals
        process: 'readonly', // Add process as read-only
      },
    },
  },
  { languageOptions: { globals: globals.browser } },
  {
    rules: {
      eqeqeq: 'off',
      'no-unused-vars': 'error', // Error for unused variables
      'prefer-const': ['error', { ignoreReadBeforeAssign: true }], // Enforce const
      'no-unused-expressions': 'error', // Error for unused expressions
      'no-console': 'warn', // Warn for console.log and similar statements
      'no-undef': 'error',
    },
  },
  {
    ignores: ['node_modules/**', 'dist/**'], // Global ignores for node_modules and dist folders
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettier.configs.recommended, // Prettier recommended rules
];
