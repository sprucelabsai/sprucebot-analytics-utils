require('dotenv').config();
const jwt = require('jwt-simple');
const request = require('superagent');

function callApi(url, token, noun, verb, object) {
  return new Promise((resolve, reject) => {
    request
    .post(url)
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
      const API_URL = process.env.ANALYTICS_API_HOST;
      const JWT_SECRET = process.env.JWT_SECRET;

      if (!API_URL) {
        throw new Error('Missing ANALYTICS_API_HOST');
      }

      if (!JWT_SECRET) {
        throw new Error('Missing JWT_SECRET');
      }

      if (!noun) {
        throw new Error('Missing noun');
      }

      if (!verb) {
        throw new Error('Missing verb');
      }

      // Generate the JWT Token
      const token = jwt.encode({}, JWT_SECRET); // We should probably encode some data inside the token
      const url = `${API_URL}/api/v1/events`

      return await callApi(url, token, noun, verb, object);
    } catch (err) {
      return err.message;
    }
  }
}
