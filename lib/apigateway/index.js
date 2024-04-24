import apigateway from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";
import SwiftwadLambdaConstruct from "#root/lib/lambda/functions";
import { configureAuthResource } from "#root/lib/apigateway/resources/auth";
import { configureWaitListResource } from "#root/lib/apigateway/resources/waitlist";
import { creatApiModels } from "#root/lib/apigateway/models/index";

export default class SwiftwadApiConstruct extends Construct {
  constructor(scope, id, extension) {
    super(scope, id);

    const api = new apigateway.RestApi(this, `SwiftwadApi-${extension}`, {
      restApiName: `SwiftwadApi-${extension}`,
    });

    const lambdaFn = new SwiftwadLambdaConstruct(this, "SwiftwadLambda", extension);

    const authorizer = new apigateway.RequestAuthorizer(
      this,
      `SwiftwadAuthorizer-${extension}`,
      {
        authorizerName: `SwiftwadAuthorizer-${extension}`,
        identitySources: [apigateway.IdentitySource.header("Authorization")],
        handler: lambdaFn.AuthorizerFunction,
      }
    );

    const models = creatApiModels(api);

    configureAuthResource(api, lambdaFn.Function, models, authorizer);
    configureWaitListResource(api, lambdaFn.Function, models);
  }
}
