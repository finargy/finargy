import crypto from "crypto";

export const get32BitRandomValue = (): string => {
  return crypto.webcrypto.randomUUID().split("-").join("");
};
