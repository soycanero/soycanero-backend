import {CreateOTPDto} from "@/types/otp";
import {
  getFirestore,
  FieldValue,
  Timestamp,
  Firestore,
} from "firebase-admin/firestore";
import {CustomLogger} from "@/shared/custom-logger";
import {
  collections,
  OTP_EXPIRATION_TIME,
} from "@/shared/constants";

export class CreateOTPService {
  private logger: CustomLogger;
  private firestore: Firestore;

  constructor() {
    this.logger = new CustomLogger("CreateOTPService");
    this.firestore = getFirestore();
  }

  async execute(dto: CreateOTPDto) {
    const otp = this.generateOTP();

    try {
      await this.firestore
        .collection(collections.otpVerifications)
        .doc(dto.email)
        .set({
          otp,
          createdAt: FieldValue.serverTimestamp(),
          expiresAt: Timestamp.fromDate(
            this.getExpirationDate(OTP_EXPIRATION_TIME),
          ), // 5 minutos
        });

      this.logger.info(
        `OTP generado y guardado para: ${dto.email}`,
      );
      return {otp};
    } catch (error) {
      this.logger.error("Error al crear OTP", error);
      throw new Error("No se pudo generar el OTP");
    }
  }

  private generateOTP(): string {
    return Math.floor(
      100000 + Math.random() * 900000,
    ).toString();
  }

  private getExpirationDate(minutes: number): Date {
    return new Date(Date.now() + minutes * 60 * 1000);
  }
}
