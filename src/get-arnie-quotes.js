const { httpGet } = require("./mock-http-interface");

/**
 * Transforms an HTTP response into the required format.
 * @param {Object} response - The HTTP response object
 * @returns {Object} The transformed response
 */
const transformResponse = (response) => {
  const body = JSON.parse(response.body);

  if (response.status === 200) {
    return { "Arnie Quote": body.message };
  } else {
    return { FAILURE: body.message };
  }
};

/**
 * Executes a HTTP GET request on each of the URLs, transforms each of the HTTP responses according to the challenge instructions and returns the results.
 * @param {string[]} urls The urls to be requested
 * @return {Promise<Object[]>} A promise which resolves to a results array.
 */
const getArnieQuotes = async (urls) => {
  const promises = urls.map(async (url) => {
    // Relies on httpGet to handle errors and return the correct format
    const response = await httpGet(url);
    return transformResponse(response);
  });

  return await Promise.all(promises);
};

module.exports = {
  getArnieQuotes,
};
