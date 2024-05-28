export default {
  require: ['./features/step-definitions/steps.ts'], // Path to your step definitions
  format: ['pretty'],
  requireModule: ['ts-node/register', 'tsconfig-paths/register'],
  timeout: 60000
};
