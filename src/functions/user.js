import * as cognitoLib from "#lib/cognito";
import * as dbLib from "#lib/dynamo";
import * as envConfig from "#config/env_config";

/**
 * Checks if a user has previously signed up
 *
 * @param {str} username the username of the user to look up, could be email/phone_number/id
 * @returns {Promise<boolean>}
 */
export const getFromCognito = async (username) => {
  const cognitoConfig = envConfig.getCognitoConfig();
  let cognitoRes;

  try {
    cognitoRes = await cognitoLib.getUserFromUserPool({
      UserPoolId: cognitoConfig.userPoolId,
      Username: username,
    });
  } catch (error) {
    console.log("ERROR WHILE GETTING COGNITO USER:", error);
    return null;
  }

  const data = cognitoRes.UserAttributes.reduce((result, item) => {
    result[item.Name] = item.Value;
    return result;
  }, {});

  const user = {
    username: cognitoRes.Username,
    is_enabled: cognitoRes.Enabled,
    full_name: data.full_name,
    country: data['custom:country'],
    email: data.email,
    email_verified: JSON.parse(data.email_verified),
    phone_number: data.phone_number,
    phone_number_verified: JSON.parse(data.phone_number_verified),
  };

  return user;
};

/**
 * Signs up a user using the provided user information.
 *
 * @param {object} userData - User data including full_name, email, phone_number, and password.
 * @returns {Promise<string>} - Promise resolving to the user's unique identifier (UserSub).
 */
export const signup = async ({
  full_name,
  email,
  phone_number,
  password,
  country,
}) => {
  const cognitoConfig = envConfig.getCognitoConfig();

  const cognitoUser = await cognitoLib.createNewCognitoUser({
    UserAttributes: [
      {
        Name: "name",
        Value: full_name,
      },
      {
        Name: "email",
        Value: email,
      },
      {
        Name: "phone_number",
        Value: phone_number,
      },
      {
        Name: "custom:country",
        Value: country,
      },
    ],
    Username: email,
    Password: password,
    ClientId: cognitoConfig.userPoolClientId,
  });
  const { UserSub } = cognitoUser;
  return UserSub;
};

/**
 * Verifies a user's email
 *
 * @param {str} email the email to look up
 * @returns {Promise<boolean>}
 */
export const verifyEmailOtp = async (username, code) => {
  const cognitoConfig = envConfig.getCognitoConfig();

  await cognitoLib.confirmSignup({
    ClientId: cognitoConfig.userPoolClientId,
    Username: username,
    ConfirmationCode: code,
  });
};

/**
 * Resend a confirmation code/otp to the user's email for verification
 *
 * @param {str} username the username of the user to send otp to
 * @returns {Promise<boolean>}
 */
export const resendEmailOtp = async (username) => {
  const cognitoConfig = envConfig.getCognitoConfig();

  await cognitoLib.resendConfirmationCode({
    ClientId: cognitoConfig.userPoolClientId,
    Username: username,
  });
};

export const authenticate = async (username, password) => {
  const cognitoConfig = envConfig.getCognitoConfig();

  const cognitoRes = await cognitoLib.authenticate({
    AuthFlow: "USER_PASSWORD_AUTH",
    AuthParameters: { USERNAME: username, PASSWORD: password },
    ClientId: cognitoConfig.userPoolClientId,
  });

  const data = {
    access_token: cognitoRes.AuthenticationResult.AccessToken,
    refresh_token: cognitoRes.AuthenticationResult.RefreshToken,
  };

  return data;
};

/**
 * Creates a user record in the database
 *
 * @returns {Promise<object>}
 */
export const createUser = async ({
  user_id,
  email,
  phone_number,
  full_name,
  country,
}) => {
  const { table_name } = envConfig.getUserTableConfig();

  const dbResponse = await dbLib.putToDb({
    TableName: table_name,
    Item: {
      user_id,
      email,
      phone_number,
      full_name,
      country,
    },
  });

  return dbResponse.Item;
};

/**
 * Creates a user record in the database
 *
 * @returns {Promise<object>}
 */
export const getUser = async (user_id) => {
  const { table_name } = envConfig.getUserTableConfig();

  const dbResponse = await dbLib.getFromDb({
    TableName: table_name,
    Key: {
      user_id,
    },
  });

  return dbResponse.Item;
};

/**
 * Allows a user to change their password using their old password.
 * 
 * @param {string} username - The username (email) of the user.
 * @param {string} oldPassword - The user's old password.
 * @param {string} newPassword - The new password to set.
 * @returns {Promise<void>}
 */
export const changePassword = async ({ oldPassword, newPassword, auth_token }) => {
  await cognitoLib.changePassword({
    PreviousPassword: oldPassword,
    ProposedPassword: newPassword,
    AccessToken: auth_token
  });
};

/**
 * Sends a reset password link to the user's email.
 * 
 * @param {string} username - The username (email) of the user.
 * @returns {Promise<void>}
 */
export const resetPassword = async (username) => {
  const cognitoConfig = envConfig.getCognitoConfig();

  await cognitoLib.initiatePasswordReset({
    ClientId: cognitoConfig.userPoolClientId,
    Username: username,
  });
};

/**
 * Resets the user's password using the reset code sent to their email.
 * 
 * @param {string} username - The username (email) of the user.
 * @param {string} code - The reset code sent to the user's email.
 * @param {string} newPassword - The new password to set.
 * @returns {Promise<void>}
 */
export const completePasswordReset = async (username, code, newPassword) => {
  const cognitoConfig = envConfig.getCognitoConfig();

  await cognitoLib.completePasswordReset({
    ClientId: cognitoConfig.userPoolClientId,
    Username: username,
    ConfirmationCode: code,
    Password: newPassword,
  });
};

/**
 * Adds a user's details to a waitlist table.
 * 
 * @param {string} username - The username (email) of the user.
 * @param {string} fullName - The full name of the user.
 * @param {string} email - The email of the user.
 * @param {string} phoneNumber - The phone number of the user.
 * @returns {Promise<void>}
 */
export const addToWaitlist = async (email) => {
  const { table_name } = envConfig.getWaitlistTableConfig();
  const join = await dbLib.putToDb({
    TableName: table_name,
    Item: {
      email
    },
  });
  return join
};
