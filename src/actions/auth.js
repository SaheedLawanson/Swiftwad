import * as userFunctions from "#functions/user";
import * as utilsLib from "#lib/util";

export const signUp = async (event) => {
  const eventBody = JSON.parse(event.body);

  try {
    const {
      email: userEmail,
      password,
      phone_number,
      full_name,
      country,
      test,
    } = eventBody;

    const email = userEmail.toLowerCase();

    const user = await userFunctions.getFromCognito(email);

    if (!!user) throw "User with email already exists";

    const user_id = await userFunctions.signup({
      full_name,
      email,
      phone_number,
      password,
      country
    });

    const lambdaResponse = utilsLib.prepLambdaResponse(null, {
      name: full_name,
      user_id: user_id,
    });

    return lambdaResponse;
  } catch (error) {
    const message = utilsLib.parseErrorMessage(error, "Signup failed");

    const errorResponse = utilsLib.prepLambdaResponse(
      { statusCode: 400, message },
      null
    );
    return errorResponse;
  }
};

export const verifyEmail = async (event) => {
  const eventBody = JSON.parse(event.body);

  try {
    const { email: userEmail, code } = eventBody;

    const email = userEmail.toLowerCase();

    const cognitoUser = await userFunctions.getFromCognito(email);
    if (!cognitoUser) throw "User with email does not exists";

    await userFunctions.verifyEmailOtp(cognitoUser.username, code);

    const user = await userFunctions.createUser({
      user_id: cognitoUser.username,
      email: email,
      phone_number: cognitoUser.phone_number,
      full_name: cognitoUser.full_name,
      country: cognitoUser.country,
    });

    const lambdaResponse = utilsLib.prepLambdaResponse(null);

    return lambdaResponse;
  } catch (error) {
    const message = utilsLib.parseErrorMessage(error);

    const errorResponse = utilsLib.prepLambdaResponse(
      { statusCode: 400, message },
      null
    );
    return errorResponse;
  }
};

export const resendEmailConfirmation = async (event) => {
  const eventBody = JSON.parse(event.body);

  try {
    const { email: userEmail } = eventBody;

    const email = userEmail.toLowerCase();

    const cognitoUser = await userFunctions.getFromCognito(email);
    if (!cognitoUser) throw "User with email does not exists";

    if (cognitoUser.email_verified) throw "Email is already verified";

    await userFunctions.resendEmailOtp(cognitoUser.username);

    const lambdaResponse = utilsLib.prepLambdaResponse(null);

    return lambdaResponse;
  } catch (error) {
    const message = utilsLib.parseErrorMessage(error);

    const errorResponse = utilsLib.prepLambdaResponse(
      { statusCode: 400, message },
      null
    );
    return errorResponse;
  }
};

export const signin = async (event) => {
  const eventBody = JSON.parse(event.body);

  try {
    const { email: userEmail, password } = eventBody;

    const email = userEmail.toLowerCase();

    const cognitoUser = await userFunctions.getFromCognito(email);
    if (!cognitoUser) throw "User with email does not exists";

    const data = await userFunctions.authenticate(
      cognitoUser.username,
      password
    );

    const { access_token } = data

    const lambdaResponse = utilsLib.prepLambdaResponse(null, {
      access_token,
    });

    return lambdaResponse;
  } catch (error) {
    const message = utilsLib.parseErrorMessage(error);

    const errorResponse = utilsLib.prepLambdaResponse(
      { statusCode: 400, message },
      null
    );
    return errorResponse;
  }
};

export const getUser = async (event) => {
  const eventBody = JSON.parse(event.body);
  const identity = utilsLib.extractTokenData(event)

  try {
    const user = await userFunctions.getUser(identity.username);

    const lambdaResponse = utilsLib.prepLambdaResponse(null, user);

    return lambdaResponse;
  } catch (error) {
    const message = utilsLib.parseErrorMessage(error);

    const errorResponse = utilsLib.prepLambdaResponse(
      { statusCode: 400, message },
      null
    );
    return errorResponse;
  }
};

