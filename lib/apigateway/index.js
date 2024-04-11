import apigateway from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";
import SwiftwadLambdaConstruct from "#root/lib/lambda/functions";
import { configureAuthResource } from "#root/lib/apigateway/resources";
import { creatApiModels} from "#root/lib/apigateway/models/index";


export default class SwiftwadApiConstruct extends Construct {
  constructor(scope, id) {
    super(scope, id);

    const api = new apigateway.RestApi(this, "SwiftwadApi", {
      restApiName: "SwiftwadApi-dev",
    });

    const lambdaFn = new SwiftwadLambdaConstruct(this, "SwiftwadLambda");

    const models = creatApiModels(api)

    configureAuthResource(api, lambdaFn.Function, models)
  }
}
