import { Stack } from "aws-cdk-lib";
import SwiftwadApiConstruct from "#root/lib/apigateway/index";
import SwiftwadCognitoConstruct from "#root/lib/cognito/index";

export class SwiftwadBackendStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);
    const apigw = new SwiftwadApiConstruct(this, "SwiftwadApi");
    const cognito = new SwiftwadCognitoConstruct(this, "SwiftWadCognito")
  }
}
