import lambda from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default class SwiftwadLambdaConstruct extends Construct {
  constructor(scope, id) {
    super(scope, id);

    const pathToRoot = path.join(__dirname, "/../..");

    this.Function = new lambda.Function(this, 'SwiftwadFn', {
      functionName: "SwiftwadBackend-dev",
      code: lambda.Code.fromAsset(path.join(pathToRoot, "src")),
      handler: 'index.main',
      runtime: lambda.Runtime.NODEJS_20_X,
    });
  }
}
