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
  const verifyEmailRequestModel = api.addModel(
    "verifyEmailRequestModel",
    requestModels.verifyEmailRequestModel
  );
  const resendEmailConfirmationRequestModel = api.addModel(
    "resendEmailConfirmation",
    requestModels.resendEmailConfirmationRequestModel
  );
  const signInRequestModel = api.addModel(
    "signInRequestModel",
    requestModels.signInRequestModel
  );
  /*********** */
  const changePasswordRequestModel = api.addModel(
    "changePasswordRequestModel",
    requestModels.changePasswordRequestModel
  );
  const resetPasswordRequestModel = api.addModel(
    "resetPasswordRequestModel",
    requestModels.resetPasswordRequestModel
  );
  const completePasswordResetRequestModel = api.addModel(
    "completePasswordResetRequestModel",
    requestModels.completePasswordResetRequestModel
  );
  const addToWaitlistRequestModel = api.addModel(
    "addToWaitlistRequestModel",
    requestModels.addToWaitlistRequestModel
  );
  return {
    signUpRequestModel,
    signUpResponseModel,
    signInRequestModel,
    verifyEmailRequestModel,
    resendEmailConfirmationRequestModel,
    changePasswordRequestModel,
    resetPasswordRequestModel,
    completePasswordResetRequestModel,
    addToWaitlistRequestModel
  }
};
