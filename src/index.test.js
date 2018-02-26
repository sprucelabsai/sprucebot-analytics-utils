require('dotenv').config();
const env = Object.assign({}, process.env);
const sbAnalyticsUtils = require('./index');

beforeEach(async () => {
  jest.clearAllMocks();
});

afterEach(async () => {
  process.env = env;
});

/**
 * Test when JWT_SECRET is not set
 */
test('env JWT_SECRET is required', async () => {
  // Delete the JWT_SECRET
  delete process.env.JWT_SECRET;

  const res = await sbAnalyticsUtils.fire('person', 'leave');
  expect(res).toContain('Require key');
});

/**
 * Test when noun is not supplied
 */
test('throws error when noun is not a string', async () => {
  const res = await sbAnalyticsUtils.fire(true, 'exit');
  expect(res).toContain('Unprocessable Entity');
});

/**
 * Test when noun is not supplied
 */
test('throws error when noun is not supplied', async () => {
  const res = await sbAnalyticsUtils.fire();
  expect(res).toContain('Missing noun');
});

/**
 * Test when verb is not supplied
 */
test('throws error when verb is not supplied', async () => {
  const res = await sbAnalyticsUtils.fire('user');
  expect(res).toContain('Missing verb');
});

/**
 * Test when verb is not supplied
 */
test('should create an event succesfully', async () => {
  const res = await sbAnalyticsUtils.fire('user', 'exit');
  expect(res).toHaveProperty('status', 200);
});
