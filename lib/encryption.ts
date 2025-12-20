import "server-only";
import crypto from "crypto";

const ALGORITHM = "aes-256-cbc";
const IV_LENGTH = 16;

export const symmetricEncrypt = (data: string) => {
  const key = process.env.ENCRYPTION_KEY;

  if (!key) {
    throw new Error("ENCRYPTION_KEY is not defined");
  }

  const encryptionKey = Buffer.from(key, "hex"); // 32 bytes
  const iv = crypto.randomBytes(IV_LENGTH);

  const cipher = crypto.createCipheriv(ALGORITHM, encryptionKey, iv);

  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");

  // نخزن iv + encrypted مع بعض
  return `${iv.toString("hex")}:${encrypted}`;
};

export const symmetricDecrypt = (encryptedData: string) => {
  const key = process.env.ENCRYPTION_KEY;

  if (!key) {
    throw new Error("ENCRYPTION_KEY is not defined");
  }

  const [ivHex, encrypted] = encryptedData.split(":");

  const encryptionKey = Buffer.from(key, "hex");
  const iv = Buffer.from(ivHex, "hex");

  const decipher = crypto.createDecipheriv(ALGORITHM, encryptionKey, iv);

  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};
