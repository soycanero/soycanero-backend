import * as functions from "firebase-functions";
import {CreateOTPService} from "@/libs/firestore/create-otp";
import {SendOTPMailService} from "@/libs/mail/send-otp-mail";

export const sendOtp = functions.https.onCall<{
  email: string;
}>(async ({data}, context) => {
  const email = data.email;

  if (!email) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Email required",
    );
  }

  const createOTPService = new CreateOTPService();
  const sendOTPMailService = new SendOTPMailService();

  const {otp} = await createOTPService.execute({email});

  await sendOTPMailService.execute({to: email, otp});

  return {success: true};
});
