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
  { signUpRequestModel, signUpResponseModel }
) => {
  const auth = api.root.addResource("auth");
  const auth_integration = new apigateway.LambdaIntegration(lambdaFn)

  const signup = auth.addResource("signup");
  const signupPost = signup.addMethod(
    "POST",
    auth_integration,
    {
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
    }
  );
};
