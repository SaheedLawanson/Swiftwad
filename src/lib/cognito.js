import { cognito } from '#lib/aws';

export const getFromUserPool = async (params) => {
  return await cognito.adminGetUser(params);
}

export const createUserInUserPool = async (params) => {
  return await cognito.adminCreateUser(params);
}

export const deleteFromUserPool = async (params) => {
  return await cognito.adminDeleteUser(params);
}

export const setUserPassword = async (params) => {
  return await cognito.adminSetUserPassword(params);
}

export const deactivateUser = async (params) => {
  return await cognito.adminDisableUser(params);
}

export const activateUser = async (params) => {
  return await cognito.adminEnableUser(params);
}

export const createNewCognitoUser = async (params) => {
  return await cognito.signUp(params);
}

export const resendConfirmationCode = async (params) => {
  return await cognito.resendConfirmationCode(params);
}

export const confirmSignup = async (params) => {
  return await cognito.confirmSignUp(params);
}