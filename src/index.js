require('dotenv').config();
const jwt = require('jwt-simple');
const request = require('superagent');

function callApi(token, noun, verb, object) {
  const API_URL = process.env.ANALYTICS_API_HOST;

  return new Promise((resolve, reject) => {
    request
    .post(`${API_URL}/api/v1/events`)
    .set({ 'authorization': `Bearer ${token}` })
    .set('Content-Type', 'application/json')
    .send({ noun, verb, object })
    .end((err, res) => {
      if (err) {
        return reject(err);
      }

      resolve({
        body: res.body,
        headers: res.headers,
        status: res.status
      });
    });
  });
}


module.exports = {
  /**
   * Fire an event to the SpruceBot Analytics API
   *
   * @param  {String} noun
   * @param  {String} verb
   * @param  {Object} [object]
   * @returns {Promise} Promise object
   */
  async fire(noun, verb, object) {
    try {
      // Generate the JWT Token
      const JWT_SECRET = process.env.JWT_SECRET;
      const token = jwt.encode({}, JWT_SECRET); // We should probably encode some data inside the token

      if (!noun) {
        throw new Error('Missing noun');
      }

      if (!verb) {
        throw new Error('Missing verb');
      }

      return await callApi(token, noun, verb, object);
    } catch (err) {
      return err.message;
    }
  }
}
