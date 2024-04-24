import { Construct } from "constructs";
import dynamodb from "aws-cdk-lib/aws-dynamodb";
import { Duration, RemovalPolicy } from "aws-cdk-lib";

export default class SwiftwadDatabaseConstruct extends Construct {
  constructor(scope, id, extension) {
    super(scope, id);

    new dynamodb.TableV2(this, `SwiftwadUserTable-${extension}`, {
      tableName: `${extension}_swiftwad_users`,
      partitionKey: { name: "user_id", type: dynamodb.AttributeType.STRING },
      removalPolicy: RemovalPolicy.RETAIN,
    });

    // Waitlist Table
    new dynamodb.TableV2(this, `SwiftwadWaitlistTable-${extension}`, {
      tableName: `${extension}_swiftwad_waitlist`,
      partitionKey: { name: "email", type: dynamodb.AttributeType.STRING },
      removalPolicy: RemovalPolicy.RETAIN,
    });
  }
}
