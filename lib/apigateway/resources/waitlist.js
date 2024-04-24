import apigateway from "aws-cdk-lib/aws-apigateway";
import lambda from "aws-cdk-lib/aws-lambda";

/**
 * Defines methods and sub-resources for the `/waitlist` resource.
 *
 * @param {apigateway.RestApi} api The API instance.
 * @param {lambda.Function} lambdaFn The Lambda function to integrate with.
 * @param {Object.<string, apigateway.Model>} models A key-value object mapping model names to model instances.
 */
export const configureWaitListResource = async (
  api,
  lambdaFn,
  {
    addToWaitlistRequestModel
  }
) => {
  const waitlist = api.root.addResource("waitlist");
  const waitlist_integration = new apigateway.LambdaIntegration(lambdaFn);

  waitlist.addMethod("PUT", waitlist_integration, {
    requestModels: { "application/json": addToWaitlistRequestModel },
    requestValidatorOptions: {
      validateRequestBody: true,
    }
  });

};
