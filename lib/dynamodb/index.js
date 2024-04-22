import { Construct } from "constructs";
import dynamodb from "aws-cdk-lib/aws-dynamodb";
import { Duration, RemovalPolicy } from "aws-cdk-lib";

export default class SwiftwadDatabaseConstruct extends Construct {
  constructor(scope, id) {
    super(scope, id);

    new dynamodb.TableV2(this, "SwiftwadUserTable", {
      tableName: "dev_swiftwad_users",
      partitionKey: { name: "user_id", type: dynamodb.AttributeType.STRING },
      removalPolicy: RemovalPolicy.RETAIN,
    });
  }
}
