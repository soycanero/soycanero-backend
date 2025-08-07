/* eslint-disable object-curly-spacing */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {GetOTPByEmailService} from "@/libs/firestore/get-otp-by-email";
import {DeleteOTPService} from "@/libs/firestore/delete-otp";

export const verifyOtp = functions.https.onCall<{
  email: string;
  otp: string;
}>(async ({data}, context) => {
  const {email, otp} = data;
  if (!email || !otp) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Email y OTP requeridos",
    );
  }

  const getOTPByEmailService = new GetOTPByEmailService();
  const deleteOTPService = new DeleteOTPService();

  const otpData = await getOTPByEmailService.execute({
    email,
  });

  if (!otpData) {
    throw new functions.https.HttpsError(
      "not-found",
      "OTP no encontrado",
    );
  }
  const {otp: otpStored, expiresAt} = otpData;

  if (otp !== otpStored) {
    throw new functions.https.HttpsError(
      "permission-denied",
      "OTP incorrecto",
    );
  }

  const now = new Date();

  if (expiresAt.getTime() < now.getTime()) {
    throw new functions.https.HttpsError(
      "deadline-exceeded",
      "OTP expirado",
    );
  }

  // Crea usuario si no existe
  let user;
  try {
    user = await admin.auth().getUserByEmail(email);
  } catch {
    user = await admin.auth().createUser({email});
  }

  // Genera Custom Token
  const token = await admin
    .auth()
    .createCustomToken(user.uid);

  // Limpia OTP
  await deleteOTPService.execute({email});

  return {token};
});
