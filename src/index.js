const { proUserSignup } = require("./functions/pro-signup");
const {
  cognito: cognitoActions,
  proUser: proUserActions,
  user: userActions,
  org: orgActions,
  verifications: verificationActions,
} = require("./actions");
const { syncParameterStore } = require("./config/env-config");

export const main = async (event, context, callback) => {
  console.log("EVENTS FOR SIGNUP: ", JSON.stringify(event));

  await syncParameterStore();

  console.log("PARAMETER STORE VARIABLES: ", process.env.ENV_PARAMETER_STORE);

  try {
    if (!!event.resource) {
      switch (event.resource) {
        case "/auth/signup":
          return await proUserSignup(event);
      }
    }
  } catch (error) {
    console.log("EVENT ERROR", error);
    throw error;
  }

  return await cognitoActions.cognitoEventHandler(event);
};
