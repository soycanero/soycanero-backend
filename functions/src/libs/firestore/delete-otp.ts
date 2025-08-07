import {collections} from "@/shared/constants";
import {CustomLogger} from "@/shared/custom-logger";
import {DeleteOTPDto} from "@/types/otp";
import {
  Firestore,
  getFirestore,
} from "firebase-admin/firestore";

export class DeleteOTPService {
  private logger: CustomLogger;
  private firestore: Firestore;

  constructor() {
    this.logger = new CustomLogger("GetOTPByEmailService");
    this.firestore = getFirestore();
  }

  async execute(dto: DeleteOTPDto) {
    try {
      const docRef = this.firestore
        .collection(collections.otpVerifications)
        .doc(dto.email);

      await docRef.delete();
      return;
    } catch (error) {
      this.logger.error("Error al eliminar OTP", error);
      throw error;
    }
  }
}
