import apigateway from "aws-cdk-lib/aws-apigateway";
import * as requestModels from "#root/lib/apigateway/models/request";
import * as responseModels from "#root/lib/apigateway/models/response";

/**
 * Create models
 *
 * @param {apigateway.RestApi} api
 */
export const creatApiModels = (api) => {
  const signUpRequestModel = api.addModel(
    "SignUpRequestModel",
    requestModels.signUpRequestModel
  );
  const signUpResponseModel = api.addModel(
    "SignUpResponseModel",
    responseModels.signUpResponseModel
  );

  return {
    signUpRequestModel,
    signUpResponseModel
  }
};
