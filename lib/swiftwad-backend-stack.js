import { Stack } from "aws-cdk-lib";
import SwiftwadApiConstruct from "#root/lib/apigateway/index";
import SwiftwadDatabaseConstruct from "#root/lib/dynamodb/index";
import SwiftwadCognitoConstruct from "#root/lib/cognito/index";
import { EXEC_ENV, STABLE_ENVS, BRANCH_NAME } from "#root/lib/config"

export class SwiftwadBackendStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props, extension) {
    super(scope, id, props);
    new SwiftwadApiConstruct(this, `SwiftwadApi-${extension}`, extension);

    if (STABLE_ENVS.includes(BRANCH_NAME)) {
      new SwiftwadDatabaseConstruct(this, `SwiftwadDB-${EXEC_ENV}`)
      new SwiftwadCognitoConstruct(this, `SwiftWadCognito${EXEC_ENV}`);
    }
  }
}
