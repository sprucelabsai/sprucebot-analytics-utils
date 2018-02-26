require('dotenv').config();
const env = Object.assign({}, process.env);
const sbAnalyticsUtils = require('./index');

/**
 * Test when JWT_SECRET is not set
 */
test('env JWT_SECRET is required', async () => {
  const JWT_SECRET = process.env.JWT_SECRET;

  // Delete the JWT_SECRET
  delete process.env.JWT_SECRET;

  const res = await sbAnalyticsUtils.fire('person', 'leave');
  expect(res).toContain('Missing JWT_SECRET');

  process.env.JWT_SECRET = JWT_SECRET;
});

/**
 * Test when ANALYTICS_API_HOST is not set
 */
test('env ANALYTICS_API_HOST is required', async () => {
  const ANALYTICS_API_HOST = process.env.ANALYTICS_API_HOST;

  // Delete the ANALYTICS_API_HOST
  delete process.env.ANALYTICS_API_HOST;

  const res = await sbAnalyticsUtils.fire('person', 'leave');
  expect(res).toContain('Missing ANALYTICS_API_HOST');

  process.env.ANALYTICS_API_HOST = ANALYTICS_API_HOST;
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
