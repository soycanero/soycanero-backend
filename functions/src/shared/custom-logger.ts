/* eslint-disable @typescript-eslint/no-explicit-any */
import * as logger from "firebase-functions/logger";

/**
 * Clase personalizada para registrar mensajes en Cloud Functions
 * con un formato consistente que incluye el nombre de la función y una marca de tiempo.
 */
export class CustomLogger {
  /**
   * Crea una instancia del logger personalizado.
   * @param {string} functionName - Nombre de la función que se incluirá en los logs.
   */
  constructor(private functionName: string) {}

  /**
   * Formatea el mensaje incluyendo el nombre de la función y la fecha ISO.
   * @private
   * @param {string} message - Mensaje base a formatear.
   * @return {string} Mensaje formateado.
   */
  private formatMessage(message: string): string {
    const timestamp = new Date().toISOString();
    return `[${this.functionName}-${timestamp}] - ${message}`;
  }

  /**
   * Registra un mensaje informativo (`info`).
   * @param {string} message - Mensaje principal.
   * @param {...any[]} args - Argumentos adicionales opcionales.
   */
  info(message: string, ...args: any[]): void {
    logger.info(this.formatMessage(message), ...args);
  }

  /**
   * Registra un mensaje de advertencia (`warn`).
   * @param {string} message - Mensaje principal.
   * @param {...any[]} args - Argumentos adicionales opcionales.
   */
  warn(message: string, ...args: any[]): void {
    logger.warn(this.formatMessage(message), ...args);
  }

  /**
   * Registra un mensaje de error (`error`), con opción de incluir un error adicional.
   * @param {string} message - Mensaje principal del error.
   * @param {unknown} [error] - Objeto de error opcional para mayor contexto.
   * @param {...any[]} args - Argumentos adicionales opcionales.
   */
  error(
    message: string,
    error?: unknown,
    ...args: any[]
  ): void {
    logger.error(
      this.formatMessage(message),
      error,
      ...args,
    );
  }

  /**
   * Registra un mensaje genérico (`log`) sin clasificar como info, warning o error.
   * @param {string} message - Mensaje principal.
   * @param {...any[]} args - Argumentos adicionales opcionales.
   */
  log(message: string, ...args: any[]): void {
    logger.log(this.formatMessage(message), ...args);
  }
}
