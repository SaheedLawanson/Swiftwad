import cognito from "aws-cdk-lib/aws-cognito";
import { Construct } from "constructs";
import { Duration, RemovalPolicy } from "aws-cdk-lib";

export default class SwiftwadCognitoConstruct extends Construct {
  constructor(scope, id) {
    super(scope, id);

    const pool = new cognito.UserPool(this, "SwiftwadUserPool", {
      accountRecovery: cognito.AccountRecovery.EMAIL_AND_PHONE_WITHOUT_MFA,
      autoVerify: {
        email: true,
        phone: true,
      },
      deletionProtection: true,
      //   email: cognito.UserPoolEmail.withSES({
      //     fromEmail: "noreply@swiftwad.com",
      //     fromName: "Swiftwad",
      //     replyTo: "support@swiftwad.com",
      //     sesRegion: "eu-west-2",
      //   }),
      mfa: cognito.Mfa.OFF,
      passwordPolicy: {
        minLength: 12,
        requireLowercase: true,
        requireUppercase: true,
        requireDigits: true,
        requireSymbols: true,
      },
      removalPolicy: RemovalPolicy.RETAIN,
      selfSignUpEnabled: true,
      signInAliases: { email: true, phone_number: true },
      standardAttributes: {
        email: { required: true, mutable: true },
        phoneNumber: { required: true, mutable: true },
        fullname: { required: false, mutable: true },
      },
      userPoolName: "SwiftwadUserPool-dev",
    });

    pool.addClient("app-client", {
      userPoolClientName: "SwiftwadUPClient-dev",
      authFlows: {
        userPassword: true,
        userSrp: true,
        adminUserPassword: true,
        custom: true,
      },
      enableTokenRevocation: true,
      generateSecret: false,
      accessTokenValidity: Duration.minutes(60),
      idTokenValidity: Duration.minutes(60),
      refreshTokenValidity: Duration.days(30),
      authSessionValidity: Duration.minutes(3),
    });
  }
}
