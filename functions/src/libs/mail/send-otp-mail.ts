import {CustomLogger} from "@/shared/custom-logger";
import {Transporter} from "nodemailer";
import {mailTransporter} from "./transporter";
import {MAIL_USER} from "@/shared/constants";

interface SendOTPMailDto {
  to: string;
  otp: string;
}

export class SendOTPMailService {
  private logger: CustomLogger;
  private transporter: Transporter;

  constructor() {
    this.logger = new CustomLogger("SendOTPMailService");
    this.transporter = mailTransporter;
  }

  async execute({to, otp}: SendOTPMailDto) {
    try {
      await this.transporter.sendMail({
        from: `"Soy Canero" <${MAIL_USER}>`,
        to,
        subject: "Bienvenido a Soy Canero",
        text: `Tu código de acceso es: ${otp}`,
      });

      this.logger.info(`Correo enviado a ${to}`);
    } catch (error) {
      this.logger.error(
        `Error al enviar correo a ${to}`,
        error,
      );
      throw new Error("No se pudo enviar el correo");
    }
  }
}
