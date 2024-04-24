import * as ssmLib from "#lib/ssm";

const EXECUTION_ENVIRONMENTS = {
  SANDBOX: "SANDBOX",
  DEVELOPMENT: "DEVELOPMENT",
  STAGING: "STAGING",
  PRODUCTION: "PRODUCTION",
};

/**
 * Fetches the current execution environment
 *
 * @typedef {("SANDBOX" | "DEVELOPMENT" | "STAGING" | "PRODUCTION")} ExecutionEnvironment
 * @returns {ExecutionEnvironment}
 */
export const getExecutionEnv = () => {
  const { EXEC_ENV } = getParameters();
  return EXECUTION_ENVIRONMENTS[EXEC_ENV];
};

/**
 * Fetches environmental variables from specifed sources and merges it into a single object
 *
 * @returns {object} Object containing all environmental variables and secrets combined with external sources
 */
export const syncParameters = async () => {
  let external_parameters = {};
  try {
    const ssmResponse = await ssmLib.getParameter({
      Name: "SWIFTWAD_DEV",
      WithDecryption: true,
    });
    external_parameters = JSON.parse(ssmResponse.Parameter.Value);
  } catch (error) {
    console.error(error);
  }

  // Merge variables from an external source e.g. parameter store.
  updateParameters(external_parameters);
};

/**
 * Gets cached environmental variables
 *
 * @returns {object} Object containing all environmental variables and secrets
 */
export const getParameters = () => {
  return typeof process.env === "string"
    ? JSON.parse(process.env)
    : process.env;
};

/**
 * Updates the environmental variables
 *
 * @param {object} params environmental variables to update with
 */
export const updateParameters = (params) => {
  const current_params = getParameters();
  process.env = { ...current_params, ...params };
};

/**
 * Get cognito related config
 *
 * @returns {object} Object containing cognito related config
 */
export const getCognitoConfig = () => {
  const { cognito } = getParameters();
  let cognitoConfig =
    typeof cognito === "string" ? JSON.parse(cognito) : cognito;
  cognitoConfig =
    typeof cognitoConfig === "string"
      ? JSON.parse(cognitoConfig)
      : cognitoConfig;
  return cognitoConfig;
};

/**
 * Get dynamodb table config
 *
 * @returns {object} Object containing cognito related config
 */
export const getUserTableConfig = () => {
  const { dynamodb } = getParameters();
  let dbConfig = typeof dynamodb === "string" ? JSON.parse(dynamodb) : dynamodb;
  dbConfig =
    typeof dbConfig === "string"
      ? JSON.parse(dbConfig)
      : dbConfig;

  return dynamodb.swiftwad_users;
};

/**
 * Get waitlist table config
 *
 * @returns {object} Object containing waitlist table configuration
 */
export const getWaitlistTableConfig = () => {
  const { dynamodb } = getParameters();
  let dbConfig = typeof dynamodb === "string" ? JSON.parse(dynamodb) : dynamodb;
  dbConfig =
    typeof dbConfig === "string"
      ? JSON.parse(dbConfig)
      : dbConfig;

  return dynamodb.swiftwad_waitlist;
};

