import apigateway from "aws-cdk-lib/aws-apigateway";

export const signUpRequestModel = {
  modelName: "SignUpRequest",
  schema: {
    schema: apigateway.JsonSchemaVersion.DRAFT4,
    title: "SignUpRequest",
    type: apigateway.JsonSchemaType.OBJECT,
    properties: {
      email: { type: apigateway.JsonSchemaType.STRING },
      full_name: { type: apigateway.JsonSchemaType.STRING },
      phone_number: {
        type: apigateway.JsonSchemaType.STRING,
        pattern: "^\\+(?:[0-9] ?){6,14}[0-9]$",
      },
      password: { type: apigateway.JsonSchemaType.STRING },
      country: {
        type: apigateway.JsonSchemaType.STRING ,
        enum: ["Nigeria", "United States", "Canada"],
      },
    },
    required: ["email", "full_name", "phone_number", "password", "country"],
  },
};

export const verifyEmailRequestModel = {
  modelName: "verifyEmailRequest",
  schema: {
    schema: apigateway.JsonSchemaVersion.DRAFT4,
    title: "verifyEmailRequest",
    type: apigateway.JsonSchemaType.OBJECT,
    properties: {
      email: { type: apigateway.JsonSchemaType.STRING },
      code: { type: apigateway.JsonSchemaType.STRING },
    },
    required: ["email", "code"],
  },
};

export const resendEmailConfirmationRequestModel = {
  modelName: "resendEmailConfirmationRequest",
  schema: {
    schema: apigateway.JsonSchemaVersion.DRAFT4,
    title: "resendEmailConfirmationRequest",
    type: apigateway.JsonSchemaType.OBJECT,
    properties: {
      email: { type: apigateway.JsonSchemaType.STRING },
    },
    required: ["email"],
  },
};


export const signInRequestModel = {
  modelName: "signInRequest",
  schema: {
    schema: apigateway.JsonSchemaVersion.DRAFT4,
    title: "signInRequest",
    type: apigateway.JsonSchemaType.OBJECT,
    properties: {
      email: { type: apigateway.JsonSchemaType.STRING },
      password: { type: apigateway.JsonSchemaType.STRING },
    },
    required: ["email", "password"],
  },
};

export const changePasswordRequestModel = {
  modelName: "changePasswordRequest",
  schema: {
    schema: apigateway.JsonSchemaVersion.DRAFT4,
    title: "changePasswordRequest",
    type: apigateway.JsonSchemaType.OBJECT,
    properties: {
      oldPassword: { type: apigateway.JsonSchemaType.STRING },
      newPassword: { type: apigateway.JsonSchemaType.STRING },
    },
    required: ["oldPassword", "newPassword"],
  },
};

export const resetPasswordRequestModel = {
  modelName: "resetPasswordRequest",
  schema: {
    schema: apigateway.JsonSchemaVersion.DRAFT4,
    title: "resetPasswordRequest",
    type: apigateway.JsonSchemaType.OBJECT,
    properties: {
      username: { type: apigateway.JsonSchemaType.STRING },
    },
    required: ["username"],
  },
};

export const completePasswordResetRequestModel = {
  modelName: "completePasswordResetRequest",
  schema: {
    schema: apigateway.JsonSchemaVersion.DRAFT4,
    title: "completePasswordResetRequest",
    type: apigateway.JsonSchemaType.OBJECT,
    properties: {
      username: { type: apigateway.JsonSchemaType.STRING },
      code: { type: apigateway.JsonSchemaType.STRING },
      newPassword: { type: apigateway.JsonSchemaType.STRING },
    },
    required: ["username", "code", "newPassword"],
  },
};

export const addToWaitlistRequestModel = {
  modelName: "addToWaitlistRequest",
  schema: {
    schema: apigateway.JsonSchemaVersion.DRAFT4,
    title: "addToWaitlistRequest",
    type: apigateway.JsonSchemaType.OBJECT,
    properties: {
      username: { type: apigateway.JsonSchemaType.STRING },
      fullName: { type: apigateway.JsonSchemaType.STRING },
      email: { type: apigateway.JsonSchemaType.STRING },
      phoneNumber: { type: apigateway.JsonSchemaType.STRING },
    },
    required: ["email"],
  },
};
