import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';

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
} from '@aws-sdk/client-cognito-identity-provider';

// Set the region
// const AWS_CONFIG = { region: "eu-west-2" };
const AWS_CONFIG = { region: "us-east-2" };

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
};