import {
  CognitoIdentityProviderClient,
  GetUserCommand,
} from "@aws-sdk/client-cognito-identity-provider";

const cognitoClient = new CognitoIdentityProviderClient({
  region: "eu-west-2",
});

const generatePolicy = (effect, resource, data = {}) => ({
  principalId: "Authorizer1",
  policyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Action: "execute-api:Invoke",
        Resource: [resource],
        Effect: effect,
      },
    ],
  },
  context: data,
});

export const main = async (event) => {
  console.log("************ EVENT ***************");
  console.log(event);
  let authResponse;

  try {
    const [_, authToken] = event.headers.Authorization.split(" ");

    const cognitoRes = await cognitoClient.send(
      new GetUserCommand({ AccessToken: authToken })
    );

    let data = cognitoRes.UserAttributes.reduce((result, item) => {
      const itemName = item.Name.replace(/^custom:/, "");
      result[itemName] = item.Value;
      return result;
    }, {});

    authResponse = generatePolicy("Allow", event.methodArn, {
      ...data,
      username: data.sub,
    });
  } catch (error) {
    console.log("ERROR OCCURED DURING AUTHORIZATION:", error);
    authResponse = generatePolicy("Deny", event.methodArn);
  }

  return authResponse;
};
