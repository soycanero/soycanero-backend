import * as nodemailer from "nodemailer";
import {MAIL_PASS, MAIL_USER} from "@/shared/constants";

export const mailTransporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  host: "smtp.gmail.com",
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // Allow self-signed certificates
    ciphers: "SSLv3",
  },
  logger: true, // Enable logging
});
