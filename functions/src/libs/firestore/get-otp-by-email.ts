import {GetOTPByEmailDto, OTP, OTPDoc} from "@/types/otp";
import {
  Firestore,
  getFirestore,
} from "firebase-admin/firestore";
import {CustomLogger} from "@/shared/custom-logger";
import {collections} from "@/shared/constants";

export class GetOTPByEmailService {
  private logger: CustomLogger;
  private firestore: Firestore;

  constructor() {
    this.logger = new CustomLogger("GetOTPByEmailService");
    this.firestore = getFirestore();
  }

  async execute(
    dto: GetOTPByEmailDto,
  ): Promise<OTP | null> {
    try {
      const docRef = this.firestore
        .collection(collections.otpVerifications)
        .doc(dto.email);

      const doc = await docRef.get();
      if (!doc.exists) {
        return null;
      }
      return this.mapping(doc);
    } catch (error) {
      this.logger.error("Error al obtener OTP", error);
      throw error;
    }
  }

  private mapping(
    doc: FirebaseFirestore.DocumentSnapshot<
      FirebaseFirestore.DocumentData,
      FirebaseFirestore.DocumentData
    >,
  ): OTP {
    const data = doc.data() as OTPDoc;
    return {
      createdAt: data.createdAt.toDate(),
      expiresAt: data.expiresAt.toDate(),
      email: data.email,
      otp: data.otp,
    };
  }
}
