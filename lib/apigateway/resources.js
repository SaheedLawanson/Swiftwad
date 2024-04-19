import apigateway from "aws-cdk-lib/aws-apigateway";
import lambda from "aws-cdk-lib/aws-lambda";

/**
 * Defines methods and sub-resources for the `/auth` resource.
 *
 * @param {apigateway.RestApi} api The API instance.
 * @param {lambda.Function} lambdaFn The Lambda function to integrate with.
 * @param {Object.<string, apigateway.Model>} models A key-value object mapping model names to model instances.
 */
export const configureAuthResource = async (
  api,
  lambdaFn,
  {
    signUpRequestModel,
    signUpResponseModel,
    verifyEmailRequestModel,
    signInRequestModel,
    resendEmailConfirmationRequestModel,
  },
  authorizer
) => {
  const auth = api.root.addResource("auth");
  const auth_integration = new apigateway.LambdaIntegration(lambdaFn);

  const signup = auth.addResource("signup");
  signup.addMethod("POST", auth_integration, {
    requestModels: { "application/json": signUpRequestModel },
    requestValidatorOptions: {
      validateRequestBody: true,
    },
    methodResponses: [
      {
        statusCode: "200",
        responseModels: {
          responseModelsKey: {
            "application/json": signUpResponseModel,
          },
        },
      },
    ],
  });

  const verifyEmail = auth.addResource("verify-email");
  verifyEmail.addMethod("POST", auth_integration, {
    requestModels: { "application/json": verifyEmailRequestModel },
    requestValidatorOptions: {
      validateRequestBody: true,
    },
  });

  const signin = auth.addResource("signin");
  signin.addMethod("POST", auth_integration, {
    requestModels: { "application/json": signInRequestModel },
    requestValidatorOptions: {
      validateRequestBody: true,
    },
  });

  const resendEmailConfirmation = auth.addResource("resend-email-confirmation");
  resendEmailConfirmation.addMethod("POST", auth_integration, {
    requestModels: { "application/json": resendEmailConfirmationRequestModel },
    requestValidatorOptions: {
      validateRequestBody: true,
    },
  });

  const getUser = auth.addResource("get-user");
  getUser.addMethod("GET", auth_integration, { authorizer });
};
