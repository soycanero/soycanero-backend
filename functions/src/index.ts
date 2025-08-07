/* eslint-disable object-curly-spacing */
/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as admin from "firebase-admin";
import {sendOtp} from "@/auth/send-otp";
import {verifyOtp} from "@/auth/verify-otp";
import {helloWorld} from "@/hello/hello";
import {config} from "dotenv";

config();
admin.initializeApp();

export {helloWorld, verifyOtp, sendOtp};
