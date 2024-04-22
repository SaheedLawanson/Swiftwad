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