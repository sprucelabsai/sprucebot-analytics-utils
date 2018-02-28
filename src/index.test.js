const env = Object.assign({}, process.env);

const sbAnalyticsUtils = require('./index');

jest.mock('superagent');
const request = require('superagent');

beforeEach(() => {
  process.env.JWT_ANALYTICS_SECRET = '1234567890';
  process.env.ANALYTICS_API_HOST = 'abcdefghijklmnopqrstuvwxyz';
});

/**
 * Test when JWT_ANALYTICS_SECRET is not set
 */
test('env JWT_ANALYTICS_SECRET is required', async () => {
  // Delete the ANALYTICS_API_HOST
  delete process.env.JWT_ANALYTICS_SECRET;

  const res = await sbAnalyticsUtils.fire('user', 'enter');
  expect(res).toContain('Missing JWT_ANALYTICS_SECRET');
});

/**
 * Test when ANALYTICS_API_HOST is not set
 */
test('env ANALYTICS_API_HOST is required', async () => {
  // Delete the ANALYTICS_API_HOST
  delete process.env.ANALYTICS_API_HOST;

  const res = await sbAnalyticsUtils.fire('user', 'enter');
  expect(res).toContain('Missing ANALYTICS_API_HOST');
});

/**
 * Test when noun is not supplied
 */
test('throws error when noun is not a string', async () => {
  const res = await sbAnalyticsUtils.fire({}, 'exit');
  expect(res).toContain('Missing noun');
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
test('throws error when noun is not a string', async () => {
  const res = await sbAnalyticsUtils.fire({});
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
test('throws error when verb is not a string', async () => {
  const res = await sbAnalyticsUtils.fire('user', {});
  expect(res).toContain('Missing verb');
});

/**
 * Test when superage err is returned
 */
test('throws error when verb is not a string', async () => {
  request.__setMockError({
    message: 'Unprocessable Entity'
  });

  const res = await sbAnalyticsUtils.fire('user', 'exit');
  expect(res).toContain('Unprocessable Entity');

  request.__setMockError();
});

/**
 * Test when verb is not supplied
 */
test('should create an event succesfully', async () => {
  const res = await sbAnalyticsUtils.fire('user', 'enter');
  expect(res.body).toHaveProperty('status', 'success');
});
