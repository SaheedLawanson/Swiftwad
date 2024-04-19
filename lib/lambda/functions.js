import lambda from "aws-cdk-lib/aws-lambda";
import iam from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default class SwiftwadLambdaConstruct extends Construct {
  constructor(scope, id) {
    super(scope, id);

    const pathToRoot = path.join(__dirname, "/../..");

    this.AuthorizerFunction = new lambda.Function(this, "SwiftwadAuthorizerFn", {
      functionName: "SwiftwadBackendAuthorizer-dev",
      code: lambda.Code.fromAsset(path.join(pathToRoot, "lib/lambda/authorizer")),
      handler: "index.main",
      runtime: lambda.Runtime.NODEJS_20_X
    })

    this.Function = new lambda.Function(this, "SwiftwadFn", {
      functionName: "SwiftwadBackend-dev",
      code: lambda.Code.fromAsset(path.join(pathToRoot, "src"), {
        exclude: ["nodejs"],
      }),
      handler: "index.main",
      runtime: lambda.Runtime.NODEJS_20_X,
    });

    this.Function.addLayers(
      new lambda.LayerVersion(this, "SwiftBackendLambdaLayer-dev", {
        code: lambda.Code.fromAsset(path.join(pathToRoot, "src", "nodejs")),
        layerVersionName: "SwiftwadLamdaDepencies",
      })
    );

    this.Function.addToRolePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ["ssm:GetParameter"],
        resources: [
          `arn:aws:ssm:eu-west-2:${process.env.AWS_ACCOUNT_ID}:parameter/SWIFTWAD_DEV`,
        ],
      })
    );

    this.Function.addToRolePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ["cognito-idp:AdminGetUser", "cognito-idp:AdminCreateUser"],
        resources: ["*"],
      })
    );

    this.Function.addToRolePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ["dynamodb:PutItem", "dynamodb:GetItem"],
        resources: [`arn:aws:dynamodb:eu-west-2:${process.env.AWS_ACCOUNT_ID}:table/dev_*`],
      })
    );
  }
}
