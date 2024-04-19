import cognito from "aws-cdk-lib/aws-cognito";
import { Construct } from "constructs";
import { Duration, RemovalPolicy } from "aws-cdk-lib";

export default class SwiftwadCognitoConstruct extends Construct {
  constructor(scope, id) {
    super(scope, id);

    const country = {
      bind: () => ({
        dataType: "String",
        mutable: true,
      }),
    };

    this.userPool = new cognito.UserPool(this, "SwiftwadUserPool", {
      userPoolName: "SwiftwadUserPool-dev",
      accountRecovery: cognito.AccountRecovery.EMAIL_AND_PHONE_WITHOUT_MFA,
      autoVerify: {
        email: true,
        phone: false,
      },
      deletionProtection: false,
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
        fullname: { required: true, mutable: true },
      },
      customAttributes: { country },
      userPoolName: "SwiftwadUserPool-dev",
    });

    this.userPoolClient = this.userPool.addClient("SwiftwadUPClient", {
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
