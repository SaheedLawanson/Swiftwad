import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import {
  SSMClient,
  GetParameterCommand,
  GetParametersCommand,
} from "@aws-sdk/client-ssm";
import {
  CognitoIdentityProviderClient,
  AdminGetUserCommand,
  AdminDeleteUserCommand,
  AdminCreateUserCommand,
  SignUpCommand,
  AdminEnableUserCommand,
  AdminDisableUserCommand,
  AdminSetUserPasswordCommand,
  ResendConfirmationCodeCommand,
  ConfirmSignUpCommand,
  VerifyUserAttributeCommand,
  GetUserAttributeVerificationCodeCommand,
  InitiateAuthCommand,
  AdminInitiateAuthCommand,
} from '@aws-sdk/client-cognito-identity-provider';

// Set the region
const AWS_CONFIG = { region: "eu-west-2" };

// Create the DynamoDB DocumentClient service object
export const docClient = DynamoDBDocument.from(new DynamoDB(AWS_CONFIG), {
  marshallOptions: { removeUndefinedValues: true },
});

const cognitoClient = new CognitoIdentityProviderClient(AWS_CONFIG);
export const cognito = {
  adminGetUser: async (params) => {
    return await cognitoClient.send(new AdminGetUserCommand(params));
  },
  adminDeleteUser: async (params) => {
    return await cognitoClient.send(new AdminDeleteUserCommand(params));
  },
  adminCreateUser: async (params) => {
    return await cognitoClient.send(new AdminCreateUserCommand(params));
  },
  adminSetUserPassword: async (params) => {
    return await cognitoClient.send(new AdminSetUserPasswordCommand(params));
  },
  adminDisableUser: async (params) => {
    return await cognitoClient.send(new AdminDisableUserCommand(params));
  },
  adminEnableUser: async (params) => {
    return await cognitoClient.send(new AdminEnableUserCommand(params));
  },
  signUp: async (params) => {
    return await cognitoClient.send(new SignUpCommand(params));
  },
  resendConfirmationCode: async (params) => {
    return await cognitoClient.send(new ResendConfirmationCodeCommand(params));
  },
  confirmSignUp: async (params) => {
    return await cognitoClient.send(new ConfirmSignUpCommand(params));
  },
  verifyUserAttribute: async (params) => {
    return await cognitoClient.send(new VerifyUserAttributeCommand(params));
  },
  getUserVerificationCode: async (params) => {
    return await cognitoClient.send(new GetUserAttributeVerificationCodeCommand(params));
  },
  initiateAuthCommand: async (params) => {
    return await cognitoClient.send(new InitiateAuthCommand(params));
  },
  adminInitiateAuthCommand: async (params) => {
    return await cognitoClient.send(new AdminInitiateAuthCommand(params));
  },
  adminInitiateAuthCommand: async (params) => {
    return await cognitoClient.send(new AdminInitiateAuthCommand(params));
  },
};

const ssmClient = new SSMClient(AWS_CONFIG);
export const ssm = {
  getParameter: async (params) =>
    await ssmClient.send(new GetParameterCommand(params)),
  getParameters: async (params) =>
    await ssmClient.send(new GetParametersCommand(params)),
};