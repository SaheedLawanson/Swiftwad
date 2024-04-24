import apigateway from "aws-cdk-lib/aws-apigateway";

export const signUpResponseModel = {
  modelName: "SignUpResponse",
  schema: {
    schema: apigateway.JsonSchemaVersion.DRAFT4,
    title: "SignUpResponse",
    type: apigateway.JsonSchemaType.OBJECT,
    properties: {
      name: { type: apigateway.JsonSchemaType.STRING },
      user_id: { type: apigateway.JsonSchemaType.STRING },
    },
    required: ["name", "user_id"],
  },
};
