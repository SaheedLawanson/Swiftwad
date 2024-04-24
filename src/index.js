import 'dotenv/config'
import * as authActions from "#actions/auth";
import { syncParameters } from "#config/env_config";

await syncParameters()

export const main = async (event, context, callback) => {
  try {
    switch (event.resource) {
      case "/auth/signup":
        return await authActions.signUp(event);
      case "/auth/verify-email":
        return await authActions.verifyEmail(event);
      case "/auth/resend-email-confirmation":
        return await authActions.resendEmailConfirmation(event);
      case "/auth/signin":
        return await authActions.signin(event);
      case "/auth/get-user":
        return await authActions.getUser(event);
      case "/auth/change-password":
        return await authActions.changePassword(event);
      case "/auth/reset-password":
        return await authActions.resetPassword(event);
      case "/auth/complete-password-reset":
        return await authActions.completePasswordReset(event);
      case "/waitlist":
        return await authActions.addToWaitlist(event);
    }
  } catch (error) {
    console.log("EVENT ERROR", error);
    throw error;
  }

};
