import apigateway from "aws-cdk-lib/aws-apigateway";

export const signUpResponseModel = {
  modelName: "SignUpResponse",
  schema: {
    schema: apigateway.JsonSchemaVersion.DRAFT4,
    title: "SignUpResponse",
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
