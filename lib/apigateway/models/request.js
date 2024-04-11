import apigateway from "aws-cdk-lib/aws-apigateway";

export const signUpRequestModel = {
  modelName: "SignUpRequest",
  schema: {
    schema: apigateway.JsonSchemaVersion.DRAFT4,
    title: "SignUpRequest",
    type: apigateway.JsonSchemaType.OBJECT,
    properties: {
      email: { type: apigateway.JsonSchemaType.STRING },
      phone_number: {
        type: apigateway.JsonSchemaType.STRING,
        pattern: "^\\+(?:[0-9] ?){6,14}[0-9]$",
      },
      password: { type: apigateway.JsonSchemaType.STRING },
    },
    required: ["email", "phone_number", "password"],
  },
};