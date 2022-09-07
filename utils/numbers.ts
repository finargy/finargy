import crypto from "crypto";

/**
 * It generates a random 32 digit token
 * @returns A string of 32 digits
 */
export const get32DigitsToken = (): string => {
  return crypto.webcrypto.randomUUID().split("-").join("");
};
