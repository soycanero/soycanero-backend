import {Timestamp} from "firebase-admin/firestore";

interface OTPBase {
  email: string;
  otp: string;
}

export interface OTPDoc extends OTPBase {
  createdAt: Timestamp;
  expiresAt: Timestamp;
}

export interface OTP extends OTPBase {
  createdAt: Date;
  expiresAt: Date;
}

export interface CreateOTPDto {
  email: string;
}

export interface GetOTPByEmailDto {
  email: string;
}

export interface DeleteOTPDto {
  email: string;
}
