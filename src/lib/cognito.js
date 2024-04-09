import { cognito } from '#lib/aws';

const getFromUserPool = async (params) => {
  return await cognito.adminGetUser(params);
}

const createUserInUserPool = async (params) => {
  return await cognito.adminCreateUser(params);
}

const deleteFromUserPool = async (params) => {
  return await cognito.adminDeleteUser(params);
}

const setUserPassword = async (params) => {
  return await cognito.adminSetUserPassword(params);
}

const deactivateUser = async (params) => {
  return await cognito.adminDisableUser(params);
}

const activateUser = async (params) => {
  return await cognito.adminEnableUser(params);
}

const createNewCognitoUser = async (params) => {
  return await cognito.signUp(params);
}

const resendConfirmationCode = async (params) => {
  return await cognito.resendConfirmationCode(params);
}

const confirmSignup = async (params) => {
  return await cognito.confirmSignUp(params);
}


export default {
  getFromUserPool,
  createUserInUserPool,
  deleteFromUserPool,
  setUserPassword,
  deactivateUser,
  activateUser,
  createNewCognitoUser,
  resendConfirmationCode,
  confirmSignup,
};