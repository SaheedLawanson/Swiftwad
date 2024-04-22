/**
 * Generates a valid response object that API Gateway understands.
 *
 * @param {number} statusCode - The status code of the response.
 * @param {object} headers - The headers of the response.
 * @param {*} body - The body of the response.
 * @returns {object} - The response object.
 */
export function prepCallback(statusCode, body) {
  // Default status code to 200 if not provided
  statusCode = statusCode || 200;

  return {
    statusCode,
    body: JSON.stringify(body),
  };
}

/**
 * Detects the response code and generates a response object.
 *
 * @param {Error|null} error - The error object, if any.
 * @param {*} response - The response data.
 * @returns {object} - The generated response object.
 */
export function prepLambdaResponse(error, response) {
  // If there is an error, prepare a failed response
  if (!!error) {
    const { statusCode = 400, message } = error;

    return prepCallback(statusCode, {
      status: "failed",
      message,
    });
  }

  // If no error, prepare a success response with provided data
  return prepCallback(200, {
    status: "success",
    data: response,
  });
}

/**
 * Parses the error message from an error object or string, with a fallback option.
 *
 * @param {Error|string|null} error - The error object or string to parse.
 * @param {string} fallback - The fallback error message if none provided.
 * @returns {string} - The parsed error message.
 */
export const parseErrorMessage = (error, fallback = "Request failed") =>
  // If error object exists and has a message, return the message
  !!error && !!error.message
    ? error.message
    : typeof error === "string"
    ? error
    : fallback;

/**
 * Extracts token data from the request context of an event object.
 *
 * @param {object} event - The event object containing the request context.
 * @returns {string} - The extracted token data.
 */
export const extractTokenData = (event) =>
  event?.requestContext?.authorizer || {};